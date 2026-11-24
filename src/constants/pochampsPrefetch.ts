/**
 * 포켓몬 메타 prefetch 요청 간 대기 (ms).
 * cron 배치용. UI 예상 시간에는 쓰지 않음.
 */
export const POKEMON_META_PREFETCH_DELAY_MS = 230;

/** 랭킹 cold rebuild 시 API 병렬 수 (pokemonMetaData 와 맞춤) */
export const RANKINGS_REBUILD_CONCURRENCY = 8;

/** Storage CSV 1건 조회 가정 지연(ms) — miss/hit 평균 */
export const RANKINGS_EST_STORAGE_MS_PER = 100;

/** champions API 1배치(병렬 chunk) 가정 지연(ms) */
export const RANKINGS_EST_API_BATCH_MS = 900;

/**
 * 대기 시간만 기준한 최대 소요(분). cron 로그/배치용.
 */
export function getPokemonMetaPrefetchMaxMinutes(pokemonCount: number): number {
  if (pokemonCount <= 1) return 1;
  return Math.ceil(
    ((pokemonCount - 1) * POKEMON_META_PREFETCH_DELAY_MS) / 60_000,
  );
}

/**
 * 랭킹 첫 로드(캐시 없음) 예상 최대 초.
 * storage 전수 스캔 + concurrency 병렬 API 보강.
 */
export function getRankingsColdLoadMaxSeconds(pokemonCount: number): number {
  const n = Math.max(1, pokemonCount);
  const storageMs = n * RANKINGS_EST_STORAGE_MS_PER;
  const batches = Math.ceil(n / RANKINGS_REBUILD_CONCURRENCY);
  const apiMs = batches * RANKINGS_EST_API_BATCH_MS;
  return Math.max(1, Math.ceil((storageMs + apiMs) / 1000));
}

/** 초 → "약 N초" / "약 N분" */
export function formatApproxDuration(totalSec: number): string {
  if (totalSec < 60) return `약 ${totalSec}초`;
  return `약 ${Math.ceil(totalSec / 60)}분`;
}
