import { type NextRequest } from 'next/server';

import {
  getDailyPositionRankings,
  rebuildDailyPositionRankingsFromApi,
} from '@/utils/pokemonMetaData';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * GET /api/pokemon-meta/rankings
 * - 기본: 캐시된 Doubles/Singles position 1~15
 * - ?rebuild=1 : API에서 랭킹 재생성 (관리/최초용)
 */
export async function GET(request: NextRequest) {
  try {
    const rebuild = request.nextUrl.searchParams.get('rebuild') === '1';
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? '15');
    const safeLimit =
      Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 50) : 15;

    if (rebuild) {
      const secret = process.env.CRON_SECRET;
      const auth = request.headers.get('authorization');
      const isDev = process.env.NODE_ENV === 'development';
      if (secret && auth !== `Bearer ${secret}` && !isDev) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const data = await rebuildDailyPositionRankingsFromApi({
        limit: safeLimit,
        concurrency: 8,
      });
      return Response.json(data);
    }

    const data = await getDailyPositionRankings(safeLimit);
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '포켓몬 랭킹을 가져오지 못했습니다.';
    return Response.json({ error: message }, { status: 500 });
  }
}
