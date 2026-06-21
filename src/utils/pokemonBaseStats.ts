import type { Pokemon } from '@/store/PokemonStore';

export const BASE_STAT_KEYS = ['H', 'A', 'B', 'C', 'D', 'S'] as const;
export type BaseStatKey = (typeof BASE_STAT_KEYS)[number];

export const BASE_STAT_MIN = 1;
export const BASE_STAT_MAX = 255;

export const BASE_STAT_LABEL: Record<BaseStatKey, string> = {
  H: '체력',
  A: '공격',
  B: '방어',
  C: '특공',
  D: '특방',
  S: '스피드',
};

export type PokemonBaseStats = Pick<Pokemon, BaseStatKey | 'total'>;

export function pickBaseStats(p: Pick<Pokemon, BaseStatKey | 'total'>): PokemonBaseStats {
  return { H: p.H, A: p.A, B: p.B, C: p.C, D: p.D, S: p.S, total: p.total };
}

export function computeBaseStatTotal(stats: Pick<Pokemon, BaseStatKey>): number {
  return BASE_STAT_KEYS.reduce((sum, key) => sum + stats[key], 0);
}

export function getRowMaxStatKeys(
  p: Pick<Pokemon, BaseStatKey>,
): Set<BaseStatKey> {
  let max = -Infinity;
  for (const key of BASE_STAT_KEYS) {
    const v = p[key];
    if (typeof v === 'number' && v > max) max = v;
  }
  if (max === -Infinity) return new Set();

  const keys = new Set<BaseStatKey>();
  for (const key of BASE_STAT_KEYS) {
    if (p[key] === max) keys.add(key);
  }
  return keys;
}

export function getHighestStatLabel(p: Pick<Pokemon, BaseStatKey>): string | null {
  const keys = getRowMaxStatKeys(p);
  if (keys.size === 0) return null;
  return [...keys].map((key) => BASE_STAT_LABEL[key]).join(' / ');
}

export function hasMaxStatChanged(
  current: Pick<Pokemon, BaseStatKey>,
  original: PokemonBaseStats | null,
): boolean {
  if (!original) return false;
  const currentMax = getRowMaxStatKeys(current);
  const originalMax = getRowMaxStatKeys(original);
  if (currentMax.size !== originalMax.size) return true;
  for (const key of currentMax) {
    if (!originalMax.has(key)) return true;
  }
  return false;
}

export function areBaseStatsModified(
  current: Pick<Pokemon, BaseStatKey>,
  original: PokemonBaseStats | null,
): boolean {
  if (!original) return false;
  return BASE_STAT_KEYS.some((key) => current[key] !== original[key]);
}
