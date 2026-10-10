/** 포켓몬 메타 prefetch 요청 간 대기 (ms) */
export const POKEMON_META_PREFETCH_DELAY_MS = 1800;

/**
 * 대기 시간만 기준한 최대 소요(분).
 * 첫 마리는 대기 없음 → (n - 1) × delay.
 * API 응답 시간은 포함하지 않으므로 UI에는 "최대 약 N분"으로 안내.
 */
export function getPokemonMetaPrefetchMaxMinutes(pokemonCount: number): number {
  if (pokemonCount <= 1) return 1;
  return Math.ceil(
    ((pokemonCount - 1) * POKEMON_META_PREFETCH_DELAY_MS) / 60_000,
  );
}
