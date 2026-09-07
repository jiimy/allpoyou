import 'server-only';

import { POCHAMS_POKEMON_DATA } from '@/components/pochamsData/PochamsPokemonData';
import {
  getDailyBattleData,
  getSeoulDateString,
  normalizePokemonSlug,
  type BattleFormat,
} from '@/utils/battleData';
import { cleanupOldBattleCsvs } from '@/utils/championsStorageCleanup';

/** 요청 간 대기 (ms). 235마리 × 3.8s ≈ 15분/포맷 + API 시간 */
export const BATTLE_PREFETCH_DELAY_MS = 3800;

/** 서버리스 배치당 작업 예산 (Hobby maxDuration 300s 대비 여유) */
export const BATTLE_PREFETCH_BATCH_BUDGET_MS = 250_000;

/** Doubles를 먼저 돌려 일일 갱신이 누락되지 않게 함 */
export const BATTLE_PREFETCH_FORMAT_ORDER: BattleFormat[] = [
  'Doubles',
  'Singles',
];

export type BattlePrefetchItemResult = {
  name: string;
  slug: string;
  format: BattleFormat;
  ok: boolean;
  cached?: boolean;
  storagePath?: string;
  cleaned?: number;
  error?: string;
};

export type BattlePrefetchBatchResult = {
  date: string;
  format: BattleFormat;
  offset: number;
  processed: number;
  succeeded: number;
  failed: number;
  cleanedFiles: number;
  done: boolean;
  /** 현재 포맷이 끝났을 때 다음 포맷 (있으면) */
  nextFormat: BattleFormat | null;
  results: BattlePrefetchItemResult[];
  next: { format: BattleFormat; offset: number } | null;
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function toBattlePokemonSlug(displayName: string): string {
  return normalizePokemonSlug(displayName);
}

/**
 * POCHAMS_POKEMON_DATA 를 3800ms 간격으로 순회하며
 * championsbattledata `/api/battle/{Doubles|Singles}/:slug` → CSV Storage 저장.
 * 일일 cron은 항상 forceRefresh 로 기존 당일 CSV를 지우고 다시 받습니다.
 * 갱신 후 Singles|Doubles/{slug}/ 에서 3일 전(및 이전) CSV는 삭제합니다.
 */
export async function runBattlePrefetchBatch(options: {
  format: BattleFormat;
  offset?: number;
  delayMs?: number;
  timeBudgetMs?: number;
  /** 기본 true — 기존 CSV 무시하고 재수집 */
  forceRefresh?: boolean;
}): Promise<BattlePrefetchBatchResult> {
  const format = options.format;
  const offset = Math.max(0, options.offset ?? 0);
  const delayMs = options.delayMs ?? BATTLE_PREFETCH_DELAY_MS;
  const timeBudgetMs =
    options.timeBudgetMs ?? BATTLE_PREFETCH_BATCH_BUDGET_MS;
  const forceRefresh = options.forceRefresh ?? true;
  const startedAt = Date.now();
  const date = getSeoulDateString();

  const results: BattlePrefetchItemResult[] = [];
  let index = offset;
  let cleanedFiles = 0;

  while (index < POCHAMS_POKEMON_DATA.length) {
    if (Date.now() - startedAt >= timeBudgetMs) {
      break;
    }

    if (index > 0 || results.length > 0 || offset > 0) {
      await sleep(delayMs);
      if (Date.now() - startedAt >= timeBudgetMs) {
        break;
      }
    }

    const name = POCHAMS_POKEMON_DATA[index]!;
    const slug = toBattlePokemonSlug(name);

    try {
      const data = await getDailyBattleData(format, slug, { forceRefresh });
      const cleanup = await cleanupOldBattleCsvs(format, slug);
      cleanedFiles += cleanup.deleted.length;
      results.push({
        name,
        slug,
        format,
        ok: true,
        cached: data.cached,
        storagePath: data.storagePath,
        cleaned: cleanup.deleted.length,
      });
    } catch (error) {
      try {
        const cleanup = await cleanupOldBattleCsvs(format, slug);
        cleanedFiles += cleanup.deleted.length;
      } catch {
        // ignore
      }
      results.push({
        name,
        slug,
        format,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    index += 1;
  }

  const succeeded = results.filter((r) => r.ok).length;
  const failed = results.length - succeeded;
  const formatDone = index >= POCHAMS_POKEMON_DATA.length;
  const formatIndex = BATTLE_PREFETCH_FORMAT_ORDER.indexOf(format);
  const nextFormat =
    formatDone && formatIndex >= 0
      ? (BATTLE_PREFETCH_FORMAT_ORDER[formatIndex + 1] ?? null)
      : null;

  let next: BattlePrefetchBatchResult['next'] = null;
  if (!formatDone) {
    next = { format, offset: index };
  } else if (nextFormat) {
    next = { format: nextFormat, offset: 0 };
  }

  return {
    date,
    format,
    offset,
    processed: results.length,
    succeeded,
    failed,
    cleanedFiles,
    done: formatDone && nextFormat == null,
    nextFormat,
    results,
    next,
  };
}
