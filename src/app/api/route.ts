import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { fetchAllPokemonKr } from '@/utils/pokeapi';
import { createClient } from '@/utils/supabase/server';

// 라우트 자체도 1주일 단위로 재검증.
// 내부 fetch도 동일 주기로 캐시되므로 PokeAPI에는 사실상 1주에 1번만 도달.
export const revalidate = 60 * 60 * 24 * 7;

/**
 * GET /api
 *
 * 쿼리 파라미터:
 *   - limit  (선택) 가져올 개수
 *   - offset (선택) 건너뛸 개수, 기본 0
 *
 * 응답:
 *   { total, count, results: PokemonKr[] }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = parsePositiveInt(searchParams.get('limit'));
    const offset = parsePositiveInt(searchParams.get('offset')) ?? 0;

    const all = await fetchAllPokemonKr();

    const sliced =
      typeof limit === 'number'
        ? all.slice(offset, offset + limit)
        : all.slice(offset);

    return Response.json({
      total: all.length,
      count: sliced.length,
      results: sliced,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}

function parsePositiveInt(value: string | null): number | undefined {
  if (value == null) return undefined;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
}

/**
 * POST /api
 *
 * 1) Supabase 연결을 확인하고
 * 2) PokeAPI 한국어 데이터를 가공해 `pokemon` 테이블에 upsert.
 *
 * 컬럼 매핑:
 *   id            -> number
 *   nameKo        -> name
 *   types[].ko    -> types (text[])
 *   stats.hp      -> H
 *   stats.attack  -> A
 *   stats.defense -> B
 *   stats.specialAttack  -> C
 *   stats.specialDefense -> D
 *   stats.speed   -> S
 *   stats.total   -> total
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1) 연결 확인 - pokemon 테이블에 가벼운 count 쿼리
    const { error: pingError } = await supabase
      .from('pokemon')
      .select('number', { count: 'exact', head: true });

    if (pingError) {
      return Response.json(
        {
          ok: false,
          stage: 'connect',
          error: `Supabase 연결 실패: ${pingError.message}`,
        },
        { status: 500 },
      );
    }

    // 2) PokeAPI에서 한국어 데이터 가져오기
    const all = await fetchAllPokemonKr();

    const rows = all.map((p) => ({
      number: p.id,
      name: p.nameKo,
      types: p.types.map((t) => t.ko),
      H: p.stats.hp,
      A: p.stats.attack,
      B: p.stats.defense,
      C: p.stats.specialAttack,
      D: p.stats.specialDefense,
      S: p.stats.speed,
      total: p.stats.total,
    }));

    // 3) upsert (number 컬럼 기준 충돌 시 덮어쓰기)
    const { error: upsertError } = await supabase
      .from('pokemon')
      .upsert(rows, { onConflict: 'number' });

    if (upsertError) {
      return Response.json(
        {
          ok: false,
          stage: 'upsert',
          error: `pokemon 테이블 upsert 실패: ${upsertError.message}`,
        },
        { status: 500 },
      );
    }

    return Response.json({
      ok: true,
      total: rows.length,
      sample: rows[0],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
