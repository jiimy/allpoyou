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
 *
 * - 한국(Asia/Seoul) 날짜 기준 하루 1회만 championsbattledata를 호출하고
 *   rows → CSV 변환 후 Supabase Storage(`battle-data`)에 저장합니다.
 * - 같은 날 이후 요청은 Storage CSV를 재사용합니다.
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { format: rawFormat, pokemon: rawPokemon } = await context.params;
    const format = normalizeBattleFormat(rawFormat);
    const pokemonSlug = normalizePokemonSlug(rawPokemon);

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

    const data = await getDailyBattleData(format, pokemonSlug);

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
