import { type NextRequest } from 'next/server';

import {
  getDailyBattleData,
  normalizeBattleFormat,
  normalizePokemonSlug,
} from '@/utils/battleData';

type RouteContext = {
  params: Promise<{
    format: string;
    pokemon: string;
  }>;
};

/**
 * GET /api/battle/:format/:pokemon
 *
 * 예: /api/battle/Doubles/garchomp
 *     /api/battle/Singles/garchomp
 *     /api/battle/Single/archaludon  (Single/Double 도 허용)
 *
 * - 한국(Asia/Seoul) 날짜 기준 하루 1회만 championsbattledata를 호출하고
 *   rows → CSV 변환 후 Supabase Storage에 저장합니다.
 * - 같은 날 이후 요청은 Storage CSV를 재사용합니다.
 * - ?refresh=1 이면 당일 CSV를 지우고 다시 받습니다.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { format: rawFormat, pokemon: rawPokemon } = await context.params;
    const format = normalizeBattleFormat(rawFormat);
    const pokemonSlug = normalizePokemonSlug(rawPokemon);
    const forceRefresh =
      request.nextUrl.searchParams.get('refresh') === '1' ||
      request.nextUrl.searchParams.get('force') === '1';

    if (!format) {
      return Response.json(
        { error: 'format은 Doubles 또는 Singles 여야 합니다.' },
        { status: 400 },
      );
    }

    if (!pokemonSlug) {
      return Response.json(
        { error: '포켓몬 영문 이름이 필요합니다.' },
        { status: 400 },
      );
    }

    const data = await getDailyBattleData(format, pokemonSlug, {
      forceRefresh,
    });

    return Response.json(data, {
      headers: {
        // 브라우저/CDN에 짧게 캐시. 일 단위 갱신은 Storage 경로로 보장.
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '배틀 데이터를 가져오지 못했습니다.';
    const status =
      message.includes('요청 실패: 404') || message.includes('404')
        ? 404
        : 500;

    return Response.json({ error: message }, { status });
  }
}
