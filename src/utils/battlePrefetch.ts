import 'server-only';

import { POCHAMS_POKEMON_DATA } from '@/components/pochamsData/PochamsPokemonData';
import {
  getDailyBattleData,
  getSeoulDateString,
  normalizePokemonSlug,
  type BattleFormat,
} from '@/utils/battleData';
import { cleanupOldBattleCsvs } from '@/utils/championsStorageCleanup';

/** 요청 간 대기 (ms). 235마리 × 2포맷 × 3.8s ≈ 30분 + API 시간 */
export const BATTLE_PREFETCH_DELAY_MS = 3800;

/** 서버리스 배치당 작업 예산 (Hobby maxDuration 300s 대비 여유) */
export const BATTLE_PREFETCH_BATCH_BUDGET_MS = 250_000;

/** 포켓몬마다 이 순서로 두 포맷을 연속 갱신 (Singles 누락 방지) */
export const BATTLE_PREFETCH_FORMATS: BattleFormat[] = ['Doubles', 'Singles'];

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
  /** 배치가 처리한 포켓몬 오프셋(시작) */
  offset: number;
  /** 이번 배치에서 끝낸 다음 포켓몬 인덱스 */
  nextOffset: number;
  processedPokemon: number;
  processedRequests: number;
  succeeded: number;
  failed: number;
  cleanedFiles: number;
  done: boolean;
  results: BattlePrefetchItemResult[];
  next: { offset: number } | null;
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
 * 포켓몬 단위로 Doubles → Singles 를 연속 호출해 CSV를 저장합니다.
 * (예전처럼 Doubles 전수 후 Singles 전수면, Doubles 체이닝만 돌고 Singles가 자주 누락됨)
 *
 * 일일 cron은 forceRefresh + 3일 이전 CSV 삭제를 수행합니다.
 */
export async function runBattlePrefetchBatch(options: {
  offset?: number;
  delayMs?: number;
  timeBudgetMs?: number;
  forceRefresh?: boolean;
  /** 기본 Doubles+Singles. 수동 실행 시 일부만 가능 */
  formats?: BattleFormat[];
}): Promise<BattlePrefetchBatchResult> {
  const offset = Math.max(0, options.offset ?? 0);
  const delayMs = options.delayMs ?? BATTLE_PREFETCH_DELAY_MS;
  const timeBudgetMs =
    options.timeBudgetMs ?? BATTLE_PREFETCH_BATCH_BUDGET_MS;
  const forceRefresh = options.forceRefresh ?? true;
  const formats = options.formats?.length
    ? options.formats
    : BATTLE_PREFETCH_FORMATS;
  const startedAt = Date.now();
  const date = getSeoulDateString();

  const results: BattlePrefetchItemResult[] = [];
  let index = offset;
  let cleanedFiles = 0;
  let requestCount = 0;
  let isFirstRequest = offset === 0;

  while (index < POCHAMS_POKEMON_DATA.length) {
    if (Date.now() - startedAt >= timeBudgetMs) {
      break;
    }

    const name = POCHAMS_POKEMON_DATA[index]!;
    const slug = toBattlePokemonSlug(name);
    let stoppedForBudget = false;

    for (const format of formats) {
      if (Date.now() - startedAt >= timeBudgetMs) {
        stoppedForBudget = true;
        break;
      }

      if (!isFirstRequest) {
        await sleep(delayMs);
        if (Date.now() - startedAt >= timeBudgetMs) {
          stoppedForBudget = true;
          break;
        }
      }
      isFirstRequest = false;
      requestCount += 1;

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
    }

    if (stoppedForBudget) {
      // 이번 포켓몬의 일부 포맷만 처리됐을 수 있음 → 같은 index부터 재시도
      break;
    }

    index += 1;
  }

  const succeeded = results.filter((r) => r.ok).length;
  const failed = results.length - succeeded;
  const done = index >= POCHAMS_POKEMON_DATA.length;

  return {
    date,
    offset,
    nextOffset: index,
    processedPokemon: Math.max(0, index - offset),
    processedRequests: requestCount,
    succeeded,
    failed,
    cleanedFiles,
    done,
    results,
    next: done ? null : { offset: index },
  };
}
