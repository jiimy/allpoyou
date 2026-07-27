import { type NextRequest } from 'next/server';

import { normalizePokemonSlug } from '@/utils/battleData';
import { getDailyPokemonMetaData } from '@/utils/pokemonMetaData';

type RouteContext = {
  params: Promise<{ pokemon: string }>;
};

/**
 * GET /api/pokemon-meta/:pokemon
 * 예: /api/pokemon-meta/archaludon
 *
 * championsbattledata /api/pokemon/:slug 호출 후 CSV를 Storage에 저장합니다.
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { pokemon: rawPokemon } = await context.params;
    const pokemonSlug = normalizePokemonSlug(rawPokemon);

    if (!pokemonSlug) {
      return Response.json(
        { error: '포켓몬 영문 이름이 필요합니다.' },
        { status: 400 },
      );
    }

    const data = await getDailyPokemonMetaData(pokemonSlug);
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '포켓몬 메타 데이터를 가져오지 못했습니다.';
    const status =
      message.includes('요청 실패: 404') || message.includes('404')
        ? 404
        : 500;
    return Response.json({ error: message }, { status });
  }
}
