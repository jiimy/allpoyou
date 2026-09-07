import 'server-only';

import { POCHAMS_POKEMON_DATA } from '@/components/pochamsData/PochamsPokemonData';
import {
  getSeoulDateString,
  normalizePokemonSlug,
} from '@/utils/battleData';
import { cleanupOldPokemonMetaCsvs } from '@/utils/championsStorageCleanup';
import { getDailyPokemonMetaData } from '@/utils/pokemonMetaData';

/** 요청 간 대기 (ms) */
export const POKEMON_META_PREFETCH_DELAY_MS = 3800;

/** 서버리스 배치당 작업 예산 (Hobby maxDuration 300s 대비 여유) */
export const POKEMON_META_PREFETCH_BATCH_BUDGET_MS = 250_000;

export type PokemonMetaPrefetchItemResult = {
  name: string;
  slug: string;
  ok: boolean;
  cached?: boolean;
  storagePath?: string;
  cleaned?: number;
  error?: string;
};

export type PokemonMetaPrefetchBatchResult = {
  date: string;
  offset: number;
  processed: number;
  succeeded: number;
  failed: number;
  cleanedFiles: number;
  done: boolean;
  results: PokemonMetaPrefetchItemResult[];
  next: { offset: number } | null;
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function toPokemonMetaSlug(displayName: string): string {
  return normalizePokemonSlug(displayName);
}

/**
 * POCHAMS_POKEMON_DATA 를 3800ms 간격으로 순회하며
 * championsbattledata `/api/pokemon/:slug` → CSV Storage 저장을 수행합니다.
 * 일일 cron은 항상 forceRefresh 로 기존 당일 CSV를 지우고 다시 받습니다.
 * 갱신 후 Pokemon/{slug}/ 에서 3일 전(및 이전) CSV는 삭제합니다.
 */
export async function runPokemonMetaPrefetchBatch(options: {
  offset?: number;
  delayMs?: number;
  timeBudgetMs?: number;
  /** 기본 true — 기존 CSV 무시하고 재수집 */
  forceRefresh?: boolean;
}): Promise<PokemonMetaPrefetchBatchResult> {
  const offset = Math.max(0, options.offset ?? 0);
  const delayMs = options.delayMs ?? POKEMON_META_PREFETCH_DELAY_MS;
  const timeBudgetMs =
    options.timeBudgetMs ?? POKEMON_META_PREFETCH_BATCH_BUDGET_MS;
  const forceRefresh = options.forceRefresh ?? true;
  const startedAt = Date.now();
  const date = getSeoulDateString();

  const results: PokemonMetaPrefetchItemResult[] = [];
  let index = offset;
  let cleanedFiles = 0;

  while (index < POCHAMS_POKEMON_DATA.length) {
    if (Date.now() - startedAt >= timeBudgetMs) {
      break;
    }

    if (index > 0) {
      await sleep(delayMs);
      if (Date.now() - startedAt >= timeBudgetMs) {
        break;
      }
    }

    const name = POCHAMS_POKEMON_DATA[index]!;
    const slug = toPokemonMetaSlug(name);

    try {
      const data = await getDailyPokemonMetaData(slug, { forceRefresh });
      const cleanup = await cleanupOldPokemonMetaCsvs(slug);
      cleanedFiles += cleanup.deleted.length;
      results.push({
        name,
        slug,
        ok: true,
        cached: data.cached,
        storagePath: data.storagePath,
        cleaned: cleanup.deleted.length,
      });
    } catch (error) {
      try {
        const cleanup = await cleanupOldPokemonMetaCsvs(slug);
        cleanedFiles += cleanup.deleted.length;
      } catch {
        // ignore
      }
      results.push({
        name,
        slug,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    index += 1;
  }

  const succeeded = results.filter((r) => r.ok).length;
  const failed = results.length - succeeded;
  const done = index >= POCHAMS_POKEMON_DATA.length;

  return {
    date,
    offset,
    processed: results.length,
    succeeded,
    failed,
    cleanedFiles,
    done,
    results,
    next: done ? null : { offset: index },
  };
}
