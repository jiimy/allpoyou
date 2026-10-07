import fs from 'node:fs/promises';
import path from 'node:path';

import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import type { PokemonMoveLearnset } from '@/utils/pokemonMovesapi';
import {
  matchesLearnsetMode,
  type LearnsetMode,
} from '@/utils/learnsetVersionGroup';
import { createClient } from '@/utils/supabase/server';

const POKEMON_MOVES_JSON_PATH = path.join(
  process.cwd(),
  'public',
  'data',
  'pokemon-with-moves.json',
);

/** Supabase 테이블명 (대시 포함 시 그대로 사용) */
const TABLE_NAME = 'pokemon-moves';

/** JSON 한 항목 (name = 한글 표시명) */
type PokemonMovesJsonRow = {
  id: number;
  number: number;
  name: string;
  moves: PokemonMoveLearnset[];
};

type DbPokemonMovesRow = {
  id: number;
  number: number;
  nameKo: string;
  moves: PokemonMoveLearnset[];
};

const UPSERT_BATCH_SIZE = 20;

async function loadPokemonMovesJson(): Promise<PokemonMovesJsonRow[]> {
  const raw = await fs.readFile(POKEMON_MOVES_JSON_PATH, 'utf8');
  const parsed = JSON.parse(raw) as PokemonMovesJsonRow[];
  if (!Array.isArray(parsed)) {
    throw new Error('pokemon-with-moves.json 형식이 올바르지 않습니다.');
  }
  return parsed;
}

function toDbRows(entries: PokemonMovesJsonRow[]): DbPokemonMovesRow[] {
  return entries.map((entry) => ({
    id: entry.id,
    number: entry.number,
    nameKo: entry.name,
    moves: entry.moves ?? [],
  }));
}

async function upsertBatches(
  supabase: ReturnType<typeof createClient>,
  rows: DbPokemonMovesRow[],
): Promise<{ upserted: number; errors: string[] }> {
  const errors: string[] = [];
  let upserted = 0;

  for (let i = 0; i < rows.length; i += UPSERT_BATCH_SIZE) {
    const batch = rows.slice(i, i + UPSERT_BATCH_SIZE);
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      errors.push(`batch ${i / UPSERT_BATCH_SIZE + 1}: ${error.message}`);
      continue;
    }
    upserted += batch.length;
  }

  return { upserted, errors };
}

function parseMoveIdsParam(
  moveId: string | null,
  moveIds: string | null,
): number[] {
  const raw = moveIds ?? moveId;
  if (!raw?.trim()) return [];

  const ids = raw
    .split(',')
    .map((v) => Number.parseInt(v.trim(), 10))
    .filter((n) => Number.isFinite(n));

  return [...new Set(ids)];
}

function parseLearnsetMode(
  searchParams: URLSearchParams,
): LearnsetMode {
  const raw =
    searchParams.get('learnsetMode')?.trim().toLowerCase() ||
    searchParams.get('versionGroup')?.trim().toLowerCase() ||
    '';

  if (raw === 'pochams' || raw === 'pochamps' || raw === 'on') {
    return 'pochams';
  }
  if (raw === 'standard' || raw === 'off' || raw === 'non-pochams') {
    return 'standard';
  }

  // ?pochamps=1 / ?pochamps=0
  const flag = searchParams.get('pochamps')?.trim().toLowerCase();
  if (flag === '1' || flag === 'true' || flag === 'on') return 'pochams';
  if (flag === '0' || flag === 'false' || flag === 'off') return 'standard';

  return 'standard';
}

function pokemonRowsWithMoveIds(
  rows: Array<{
    id: number;
    number: number;
    nameKo: string;
    moves: PokemonMoveLearnset[] | null | undefined;
  }>,
  targetMoveIds: Set<number>,
  mode: LearnsetMode,
) {
  const pokemon: { id: number; number: number; nameKo: string }[] = [];

  for (const row of rows) {
    const moves = (row.moves ?? []) as PokemonMoveLearnset[];
    const hasMove = moves.some(
      (entry) =>
        targetMoveIds.has(entry.move_id) &&
        matchesLearnsetMode(entry.version_group, mode),
    );
    if (!hasMove) continue;

    pokemon.push({
      id: row.id,
      number: row.number,
      nameKo: row.nameKo,
    });
  }

  return pokemon;
}

function extractMoveIds(
  moves: PokemonMoveLearnset[] | null | undefined,
  mode: LearnsetMode = 'standard',
): number[] {
  return [
    ...new Set(
      (moves ?? [])
        .filter((entry) => matchesLearnsetMode(entry.version_group, mode))
        .map((entry) => entry.move_id)
        .filter((id): id is number => typeof id === 'number'),
    ),
  ].sort((a, b) => a - b);
}

let cachedLocalPokemonMoves: PokemonMovesJsonRow[] | null = null;

async function loadLocalPokemonMovesCache(
  forceReload = false,
): Promise<PokemonMovesJsonRow[]> {
  if (!forceReload && cachedLocalPokemonMoves) return cachedLocalPokemonMoves;
  cachedLocalPokemonMoves = await loadPokemonMovesJson();
  return cachedLocalPokemonMoves;
}

function findLocalPokemonMoves(
  rows: PokemonMovesJsonRow[],
  pokemonId: number,
  nameKo?: string | null,
): PokemonMovesJsonRow | undefined {
  // pokemon.csv row id 와 moves JSON id(도감번호)가 다르므로 이름 우선
  if (nameKo) {
    const exact = rows.find((row) => row.name === nameKo);
    if (exact) return exact;
  }

  return rows.find((row) => row.id === pokemonId);
}

async function resolvePokemonMoveIds(
  _supabase: ReturnType<typeof createClient>,
  pokemonId: number,
  nameKo?: string | null,
  mode: LearnsetMode = 'standard',
): Promise<{
  pokemon: { id: number; number: number; nameKo: string };
  moveIds: number[];
} | null> {
  // version_group 규칙은 로컬 pokemon-with-moves.json 기준
  const localRows = await loadLocalPokemonMovesCache(true);
  const local = findLocalPokemonMoves(localRows, pokemonId, nameKo);
  if (!local) return null;

  return {
    pokemon: {
      id: local.id,
      number: local.number,
      nameKo: local.name,
    },
    moveIds: extractMoveIds(local.moves, mode),
  };
}

/**
 * GET /api/moves
 *
 * - ?pokemonName=이상해씨 — 포켓몬 이름으로 move_id 목록
 * - ?pokemonId=1 — 포켓몬 id로 move_id 목록 (nameKo와 함께 보내면 id 불일치 시 이름으로 fallback)
 * - ?moveId=433 또는 ?moveIds=433,434 — 해당 기술을 배울 수 있는 포켓몬 목록
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const pokemonName = searchParams.get('pokemonName')?.trim();
    const pokemonIdParam = searchParams.get('pokemonId');
    const nameKoParam = searchParams.get('nameKo')?.trim();
    const moveIds = parseMoveIdsParam(
      searchParams.get('moveId'),
      searchParams.get('moveIds'),
    );
    const learnsetMode = parseLearnsetMode(searchParams);

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    if (pokemonIdParam) {
      const pokemonId = Number.parseInt(pokemonIdParam, 10);
      if (!Number.isFinite(pokemonId)) {
        return Response.json({ error: 'pokemonId가 올바르지 않습니다.' }, { status: 400 });
      }

      const resolved = await resolvePokemonMoveIds(
        supabase,
        pokemonId,
        nameKoParam,
        learnsetMode,
      );

      if (!resolved) {
        return Response.json({ error: '포켓몬을 찾을 수 없습니다.' }, { status: 404 });
      }

      return Response.json({
        pokemon: resolved.pokemon,
        moveIds: resolved.moveIds,
        learnsetMode,
      });
    }

    if (pokemonName) {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('nameKo, moves')
        .ilike('nameKo', `%${pokemonName}%`);

      if (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }

      const moveIdSet = new Set<number>();
      const pokemonNames: string[] = [];

      for (const row of data ?? []) {
        const nameKo = row.nameKo as string;
        if (nameKo) pokemonNames.push(nameKo);
        const moves = (row.moves ?? []) as PokemonMoveLearnset[];
        for (const entry of moves) {
          if (
            typeof entry.move_id === 'number' &&
            matchesLearnsetMode(entry.version_group, learnsetMode)
          ) {
            moveIdSet.add(entry.move_id);
          }
        }
      }

      return Response.json({
        pokemonNames,
        moveIds: [...moveIdSet].sort((a, b) => a - b),
        learnsetMode,
      });
    }

    if (moveIds.length > 0) {
      const targetMoveIds = new Set(moveIds);

      // version_group 규칙은 local pokemon-with-moves.json 기준
      const localRows = await loadLocalPokemonMovesCache(true);
      const pokemon = pokemonRowsWithMoveIds(
        localRows.map((row) => ({
          id: row.id,
          number: row.number,
          nameKo: row.name,
          moves: row.moves,
        })),
        targetMoveIds,
        learnsetMode,
      );

      return Response.json({
        moveIds,
        learnsetMode,
        pokemon,
        count: pokemon.length,
      });
    }

    return Response.json(
      {
        error:
          'pokemonName, pokemonId 또는 moveId/moveIds 쿼리가 필요합니다.',
      },
      { status: 400 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/moves
 *
 * public/data/pokemon-with-moves.json → Supabase `pokemon_moves` 테이블 upsert
 *
 * 매핑: id→id, number→number, name(한글)→nameKo, moves→moves
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error: pingError } = await supabase
      .from(TABLE_NAME)
      .select('id', { count: 'exact', head: true });

    if (pingError) {
      return Response.json(
        {
          ok: false,
          stage: 'connect',
          error: `Supabase 연결 실패 (${TABLE_NAME}): ${pingError.message}`,
        },
        { status: 500 },
      );
    }

    const entries = await loadPokemonMovesJson();
    const rows = toDbRows(entries);
    const { upserted, errors } = await upsertBatches(supabase, rows);

    if (errors.length > 0 && upserted === 0) {
      return Response.json(
        {
          ok: false,
          stage: 'upsert',
          total: rows.length,
          upserted,
          errors,
        },
        { status: 500 },
      );
    }

    const withMoves = rows.filter((r) => r.moves.length > 0).length;

    return Response.json({
      ok: true,
      table: TABLE_NAME,
      total: rows.length,
      upserted,
      withMoves,
      withoutMoves: rows.length - withMoves,
      totalMoveEntries: rows.reduce((sum, r) => sum + r.moves.length, 0),
      sample: rows[0],
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
