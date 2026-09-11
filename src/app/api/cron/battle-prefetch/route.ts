import { after } from 'next/server';
import { type NextRequest } from 'next/server';

import {
  BATTLE_PREFETCH_BATCH_BUDGET_MS,
  BATTLE_PREFETCH_DELAY_MS,
  BATTLE_PREFETCH_FORMATS,
  runBattlePrefetchBatch,
} from '@/utils/battlePrefetch';
import {
  normalizeBattleFormat,
  type BattleFormat,
} from '@/utils/battleData';

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

function scheduleNextBatch(request: NextRequest, offset: number, formatsParam: string | null) {
  const secret = process.env.CRON_SECRET;
  const url = new URL('/api/cron/battle-prefetch', getBaseUrl(request));
  url.searchParams.set('offset', String(offset));
  if (formatsParam) url.searchParams.set('formats', formatsParam);

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

function parseFormatsParam(raw: string | null): BattleFormat[] | undefined {
  if (!raw?.trim()) return undefined;
  const list: BattleFormat[] = [];
  for (const part of raw.split(',')) {
    const format = normalizeBattleFormat(part);
    if (format && !list.includes(format)) list.push(format);
  }
  return list.length > 0 ? list : undefined;
}

/**
 * GET /api/cron/battle-prefetch
 *
 * 매일 KST 02:00 (UTC 17:00, vercel.json) 시작
 * → 포켓몬마다 Doubles → Singles 연속 갱신 (Singles 누락 방지)
 * → forceRefresh + 3일 이전 CSV 삭제
 *
 * 예:
 *   /api/cron/battle-prefetch
 *   /api/cron/battle-prefetch?offset=40
 *   /api/cron/battle-prefetch?formats=Singles   (Singles만)
 */
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const offset = Number(request.nextUrl.searchParams.get('offset') ?? '0');
  if (!Number.isFinite(offset) || offset < 0) {
    return Response.json({ error: 'offset이 올바르지 않습니다.' }, { status: 400 });
  }

  const formatsParam = request.nextUrl.searchParams.get('formats');
  const formats = parseFormatsParam(formatsParam);

  const batch = await runBattlePrefetchBatch({
    offset: Math.floor(offset),
    delayMs: BATTLE_PREFETCH_DELAY_MS,
    timeBudgetMs: BATTLE_PREFETCH_BATCH_BUDGET_MS,
    forceRefresh: true,
    formats,
  });

  if (batch.next) {
    scheduleNextBatch(request, batch.next.offset, formatsParam);
    return Response.json({
      message: '배치 처리 후 다음 배치를 예약했습니다.',
      delayMs: BATTLE_PREFETCH_DELAY_MS,
      batchBudgetMs: BATTLE_PREFETCH_BATCH_BUDGET_MS,
      formats: formats ?? BATTLE_PREFETCH_FORMATS,
      ...batch,
    });
  }

  return Response.json({
    message: 'Battle prefetch 완료',
    delayMs: BATTLE_PREFETCH_DELAY_MS,
    batchBudgetMs: BATTLE_PREFETCH_BATCH_BUDGET_MS,
    formats: formats ?? BATTLE_PREFETCH_FORMATS,
    ...batch,
  });
}
