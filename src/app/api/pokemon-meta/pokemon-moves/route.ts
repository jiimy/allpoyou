import { type NextRequest } from 'next/server';

import { getPochampsLearnableMoveNamesForPokemon } from '@/utils/pokemonMetaData';

export const dynamic = 'force-dynamic';

/**
 * GET /api/pokemon-meta/pokemon-moves?slug=garchomp
 * 또는 ?name=Garchomp
 *
 * 해당 포켓몬 CSV의 learnableMoveNames 목록
 */
export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug')?.trim();
    const name = request.nextUrl.searchParams.get('name')?.trim();
    const key = slug || name;

    if (!key) {
      return Response.json(
        { error: 'slug 또는 name 쿼리가 필요합니다.' },
        { status: 400 },
      );
    }

    const data = await getPochampsLearnableMoveNamesForPokemon(key);
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '포챔스 포켓몬 기술 목록을 가져오지 못했습니다.';
    return Response.json({ error: message }, { status: 500 });
  }
}
