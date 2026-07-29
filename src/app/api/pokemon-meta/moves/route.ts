import { after } from 'next/server';
import { type NextRequest } from 'next/server';

import { getSeoulDateString } from '@/utils/battleData';
import {
  getDailyPochampsMovesIndex,
  rebuildPochampsMovesIndexFromStorage,
} from '@/utils/pokemonMetaData';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * GET /api/pokemon-meta/moves
 * Pokemon/{slug}/{date}.csv 의 learnableMoveNames 항목을 집계한 포챔스 기술 목록
 *
 * ?rebuild=1 : 인덱스 재생성
 */
export async function GET(request: NextRequest) {
  try {
    const rebuild = request.nextUrl.searchParams.get('rebuild') === '1';

    if (rebuild) {
      const secret = process.env.CRON_SECRET;
      const auth = request.headers.get('authorization');
      const isDev = process.env.NODE_ENV === 'development';
      if (secret && auth !== `Bearer ${secret}` && !isDev) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const data = await rebuildPochampsMovesIndexFromStorage();
      return Response.json(data);
    }

    const data = await getDailyPochampsMovesIndex();
    const today = getSeoulDateString();

    if (data.date !== today || data.names.length === 0) {
      after(async () => {
        try {
          await rebuildPochampsMovesIndexFromStorage();
        } catch (error) {
          console.error('[pokemon-meta/moves] background rebuild 실패', error);
        }
      });
    }

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '포챔스 기술 목록을 가져오지 못했습니다.';
    return Response.json({ error: message }, { status: 500 });
  }
}
