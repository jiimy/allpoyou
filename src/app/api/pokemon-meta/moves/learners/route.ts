import { type NextRequest } from 'next/server';

import { getPochampsLearnersForMoveKeys } from '@/utils/pokemonMetaData';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * GET /api/pokemon-meta/moves/learners?keys=electro-shot,flash-cannon
 *
 * learnableMoveNames 기준으로 해당 기술을 가진 포켓몬 목록
 */
export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('keys')?.trim() ?? '';
    const keys = raw
      .split(',')
      .map((key) => key.trim())
      .filter(Boolean);

    if (keys.length === 0) {
      return Response.json(
        { error: 'keys 쿼리가 필요합니다. (예: keys=electro-shot)' },
        { status: 400 },
      );
    }

    const data = await getPochampsLearnersForMoveKeys(keys);
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '포챔스 배울 수 있는 포켓몬 목록을 가져오지 못했습니다.';
    return Response.json({ error: message }, { status: 500 });
  }
}
