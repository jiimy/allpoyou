import { after } from 'next/server';
import { type NextRequest } from 'next/server';

import { getSeoulDateString } from '@/utils/battleData';
import {
  getDailyPositionRankings,
  rebuildDailyPositionRankingsFromApi,
} from '@/utils/pokemonMetaData';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * GET /api/pokemon-meta/rankings
 * - 기본: 캐시된 Doubles/Singles position 1~15 (오늘 → 어제 → 최근 파일)
 * - 오늘자 캐시가 없으면 백그라운드에서 재생성
 * - ?rebuild=1 : pokemon API(`/api/pokemon/:slug`) battle_summary 기준 재생성
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
    const today = getSeoulDateString();

    // 오늘자 랭킹이 없으면 백그라운드로 갱신 (응답은 어제/최근 데이터로 즉시 반환)
    if (
      data.date !== today ||
      (data.doubles.length === 0 && data.singles.length === 0)
    ) {
      after(async () => {
        try {
          await rebuildDailyPositionRankingsFromApi({
            limit: safeLimit,
            concurrency: 8,
          });
        } catch (error) {
          console.error('[pokemon-meta/rankings] background rebuild 실패', error);
        }
      });
    }

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
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
