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

/**
 * GET /api/moves?pokemonName=이상해씨
 *
 * pokemon-moves 테이블에서 포켓몬 이름(한글)으로 검색 후 move_id 목록 반환
 */
export async function GET(request: NextRequest) {
  try {
    const pokemonName = request.nextUrl.searchParams.get('pokemonName')?.trim();
    if (!pokemonName) {
      return Response.json(
        { error: 'pokemonName 쿼리가 필요합니다.' },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('nameKo, moves')
      .ilike('nameKo', `%${pokemonName}%`);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const moveIds = new Set<number>();
    const pokemonNames: string[] = [];

    for (const row of data ?? []) {
      const nameKo = row.nameKo as string;
      if (nameKo) pokemonNames.push(nameKo);
      const moves = (row.moves ?? []) as PokemonMoveLearnset[];
      for (const entry of moves) {
        if (typeof entry.move_id === 'number') {
          moveIds.add(entry.move_id);
        }
      }
    }

    return Response.json({
      pokemonNames,
      moveIds: [...moveIds].sort((a, b) => a - b),
    });
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
