import { after } from 'next/server';
import { type NextRequest } from 'next/server';

import { rebuildDailyPositionRankingsFromApi } from '@/utils/pokemonMetaData';
import {
  POKEMON_META_PREFETCH_BATCH_BUDGET_MS,
  POKEMON_META_PREFETCH_DELAY_MS,
  runPokemonMetaPrefetchBatch,
} from '@/utils/pokemonMetaPrefetch';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function authorize(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return process.env.NODE_ENV === 'development';
  }

  const auth = request.headers.get('authorization');
  if (auth === `Bearer ${secret}`) return true;
  if (request.headers.get('x-vercel-cron') === '1') return true;
  return false;
}

function getBaseUrl(request: NextRequest): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (site) return site.replace(/\/$/, '');

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercel) {
    return vercel.startsWith('http')
      ? vercel.replace(/\/$/, '')
      : `https://${vercel}`;
  }

  const host = request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') ?? 'http';
  return `${proto}://${host}`;
}

function scheduleNextBatch(request: NextRequest, offset: number) {
  const secret = process.env.CRON_SECRET;
  const url = new URL('/api/cron/pokemon-prefetch', getBaseUrl(request));
  url.searchParams.set('offset', String(offset));

  const headers: HeadersInit = { Accept: 'application/json' };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  after(async () => {
    try {
      await fetch(url, { method: 'GET', headers, cache: 'no-store' });
    } catch (error) {
      console.error('[pokemon-prefetch] next batch 호출 실패', error);
    }
  });
}

/**
 * GET /api/cron/pokemon-prefetch
 *
 * 매일 KST 01:00 (UTC 16:00, vercel.json) 시작
 * → championsbattledata.com/api/pokemon/:slug 전수 호출
 * → 기존 당일 CSV 삭제 후 재저장 (forceRefresh)
 * → Doubles/Singles position 1~15 랭킹 CSV 갱신
 */
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const offset = Number(request.nextUrl.searchParams.get('offset') ?? '0');
  if (!Number.isFinite(offset) || offset < 0) {
    return Response.json({ error: 'offset이 올바르지 않습니다.' }, { status: 400 });
  }

  const batch = await runPokemonMetaPrefetchBatch({
    offset: Math.floor(offset),
    delayMs: POKEMON_META_PREFETCH_DELAY_MS,
    timeBudgetMs: POKEMON_META_PREFETCH_BATCH_BUDGET_MS,
    forceRefresh: true,
  });

  if (batch.next) {
    scheduleNextBatch(request, batch.next.offset);
    return Response.json({
      message: '배치 처리 후 다음 배치를 예약했습니다.',
      delayMs: POKEMON_META_PREFETCH_DELAY_MS,
      batchBudgetMs: POKEMON_META_PREFETCH_BATCH_BUDGET_MS,
      ...batch,
    });
  }

  let rankings = null;
  try {
    rankings = await rebuildDailyPositionRankingsFromApi({
      limit: 15,
      concurrency: 8,
    });
  } catch (error) {
    console.error('[pokemon-prefetch] rankings 재생성 실패', error);
  }

  return Response.json({
    message: 'Pokemon meta prefetch 완료',
    delayMs: POKEMON_META_PREFETCH_DELAY_MS,
    batchBudgetMs: POKEMON_META_PREFETCH_BATCH_BUDGET_MS,
    rankings: rankings
      ? {
          date: rankings.date,
          doubles: rankings.doubles.length,
          singles: rankings.singles.length,
        }
      : null,
    ...batch,
  });
}
