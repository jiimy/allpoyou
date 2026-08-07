import { after } from 'next/server';
import { type NextRequest } from 'next/server';

import {
  BATTLE_PREFETCH_BATCH_BUDGET_MS,
  BATTLE_PREFETCH_DELAY_MS,
  BATTLE_PREFETCH_FORMAT_ORDER,
  runBattlePrefetchBatch,
} from '@/utils/battlePrefetch';
import { normalizeBattleFormat } from '@/utils/battleData';

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

function scheduleNextBatch(
  request: NextRequest,
  next: { format: string; offset: number },
) {
  const secret = process.env.CRON_SECRET;
  const url = new URL('/api/cron/battle-prefetch', getBaseUrl(request));
  url.searchParams.set('format', next.format);
  url.searchParams.set('offset', String(next.offset));

  const headers: HeadersInit = { Accept: 'application/json' };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  after(async () => {
    try {
      await fetch(url, { method: 'GET', headers, cache: 'no-store' });
    } catch (error) {
      console.error('[battle-prefetch] next batch 호출 실패', error);
    }
  });
}

/**
 * GET /api/cron/battle-prefetch
 *
 * 매일 KST 02:00 (UTC 17:00, vercel.json) 시작
 * → championsbattledata.com/api/battle/{Singles|Doubles}/:slug 전수 호출
 * → 기존 당일 CSV 삭제 후 재저장 (forceRefresh)
 * → Singles 완료 후 Doubles
 * → 홈에서 포켓몬 클릭 시 상세(/api/battle/...) 에 사용
 *
 * 랭킹은 pokemon-prefetch(`/api/pokemon/:slug`) 쪽에서 생성합니다.
 *
 * 예: /api/cron/battle-prefetch
 *     /api/cron/battle-prefetch?format=Singles&offset=0
 */
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rawFormat =
    request.nextUrl.searchParams.get('format') ??
    BATTLE_PREFETCH_FORMAT_ORDER[0]!;
  const format = normalizeBattleFormat(rawFormat);
  if (!format) {
    return Response.json(
      { error: 'format은 Singles 또는 Doubles 여야 합니다.' },
      { status: 400 },
    );
  }

  const offset = Number(request.nextUrl.searchParams.get('offset') ?? '0');
  if (!Number.isFinite(offset) || offset < 0) {
    return Response.json({ error: 'offset이 올바르지 않습니다.' }, { status: 400 });
  }

  const batch = await runBattlePrefetchBatch({
    format,
    offset: Math.floor(offset),
    delayMs: BATTLE_PREFETCH_DELAY_MS,
    timeBudgetMs: BATTLE_PREFETCH_BATCH_BUDGET_MS,
    forceRefresh: true,
  });

  if (batch.next) {
    scheduleNextBatch(request, batch.next);
    return Response.json({
      message: '배치 처리 후 다음 배치를 예약했습니다.',
      delayMs: BATTLE_PREFETCH_DELAY_MS,
      batchBudgetMs: BATTLE_PREFETCH_BATCH_BUDGET_MS,
      ...batch,
    });
  }

  return Response.json({
    message: 'Battle prefetch 완료',
    delayMs: BATTLE_PREFETCH_DELAY_MS,
    batchBudgetMs: BATTLE_PREFETCH_BATCH_BUDGET_MS,
    ...batch,
  });
}
