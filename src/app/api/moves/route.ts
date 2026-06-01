import fs from 'node:fs/promises';
import path from 'node:path';

import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import type { PokemonMoveLearnset } from '@/utils/pokemonMovesapi';
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

async function fetchAllPokemonMovesRows(
  supabase: ReturnType<typeof createClient>,
): Promise<{ data: DbPokemonMovesRow[] | null; error: { message: string } | null }> {
  const pageSize = 1000;
  const all: DbPokemonMovesRow[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('id, number, nameKo, moves')
      .order('number', { ascending: true })
      .order('nameKo', { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) return { data: null, error };

    const page = (data ?? []) as DbPokemonMovesRow[];
    all.push(...page);

    if (page.length < pageSize) break;
    from += pageSize;
  }

  return { data: all, error: null };
}

function pokemonRowsWithMoveIds(
  rows: DbPokemonMovesRow[],
  targetMoveIds: Set<number>,
) {
  const pokemon: { id: number; number: number; nameKo: string }[] = [];

  for (const row of rows) {
    const moves = (row.moves ?? []) as PokemonMoveLearnset[];
    const hasMove = moves.some((entry) => targetMoveIds.has(entry.move_id));
    if (!hasMove) continue;

    pokemon.push({
      id: row.id,
      number: row.number,
      nameKo: row.nameKo,
    });
  }

  return pokemon;
}

/**
 * GET /api/moves
 *
 * - ?pokemonName=이상해씨 — 포켓몬 이름으로 move_id 목록
 * - ?pokemonId=1 — 포켓몬 id로 move_id 목록
 * - ?moveId=433 또는 ?moveIds=433,434 — 해당 기술을 배울 수 있는 포켓몬 목록
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const pokemonName = searchParams.get('pokemonName')?.trim();
    const pokemonIdParam = searchParams.get('pokemonId');
    const moveIds = parseMoveIdsParam(
      searchParams.get('moveId'),
      searchParams.get('moveIds'),
    );

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    if (pokemonIdParam) {
      const pokemonId = Number.parseInt(pokemonIdParam, 10);
      if (!Number.isFinite(pokemonId)) {
        return Response.json({ error: 'pokemonId가 올바르지 않습니다.' }, { status: 400 });
      }

      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('id, number, nameKo, moves')
        .eq('id', pokemonId)
        .maybeSingle();

      if (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }

      if (!data) {
        return Response.json({ error: '포켓몬을 찾을 수 없습니다.' }, { status: 404 });
      }

      const moves = (data.moves ?? []) as PokemonMoveLearnset[];
      const moveIdList = [
        ...new Set(
          moves
            .map((entry) => entry.move_id)
            .filter((id): id is number => typeof id === 'number'),
        ),
      ].sort((a, b) => a - b);

      return Response.json({
        pokemon: {
          id: data.id as number,
          number: data.number as number,
          nameKo: data.nameKo as string,
        },
        moveIds: moveIdList,
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
          if (typeof entry.move_id === 'number') {
            moveIdSet.add(entry.move_id);
          }
        }
      }

      return Response.json({
        pokemonNames,
        moveIds: [...moveIdSet].sort((a, b) => a - b),
      });
    }

    if (moveIds.length > 0) {
      const { data, error } = await fetchAllPokemonMovesRows(supabase);

      if (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }

      const targetMoveIds = new Set(moveIds);
      const pokemon = pokemonRowsWithMoveIds(data ?? [], targetMoveIds);

      return Response.json({
        moveIds,
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
