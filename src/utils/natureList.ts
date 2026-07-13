import { NATURE_GRID, STAT_LABELS, type StatLabel } from '@/components/natureTable/natureData';

export type NatureEntry = {
  /** 성격 한글 이름 */
  name: string;
  /** 1.1배 상승 능력치 (보정 없으면 null) */
  up: StatLabel | null;
  /** 0.9배 하락 능력치 (보정 없으면 null) */
  down: StatLabel | null;
};

/** 능력치 보정이 없는(상승=하락) 성격인지 여부 */
export function isNeutralNature(entry: NatureEntry): boolean {
  return entry.up == null || entry.down == null;
}

/** 5x5 성격 매트릭스를 평탄화한 전체 성격 목록 (25종) */
export const NATURE_LIST: NatureEntry[] = NATURE_GRID.flatMap((row, rowIndex) =>
  row.map((name, colIndex) => {
    const isNeutral = rowIndex === colIndex;
    return {
      name,
      up: isNeutral ? null : STAT_LABELS[rowIndex],
      down: isNeutral ? null : STAT_LABELS[colIndex],
    };
  }),
);

/** 보정이 있는 선택 가능한 성격 목록 (보정 없음 제외) */
export const SELECTABLE_NATURE_LIST: NatureEntry[] = NATURE_LIST.filter(
  (entry) => !isNeutralNature(entry),
);

const NATURE_BY_NAME = NATURE_LIST.reduce<Record<string, NatureEntry>>(
  (acc, entry) => {
    acc[entry.name] = entry;
    return acc;
  },
  {},
);

export function getNatureEntry(name: string | null): NatureEntry | null {
  if (!name) return null;
  return NATURE_BY_NAME[name] ?? null;
}

/** 선택 가능한(보정 있는) 성격인지 여부 */
export function isValidNature(name: string | null): boolean {
  if (!name) return false;
  const entry = NATURE_BY_NAME[name];
  return entry != null && !isNeutralNature(entry);
}

/** 성격 보정 효과 라벨 (예: "공격↑ 방어↓", "보정 없음") */
export function getNatureEffectLabel(entry: NatureEntry): string {
  if (!entry.up || !entry.down) return '보정 없음';
  return `${entry.up}↑ ${entry.down}↓`;
}

/** 키워드로 성격을 검색합니다. 보정 없음 성격은 제외하고, 이름 또는 보정 능력치 기준 부분 일치. */
export function searchNatures(keyword: string, limit = 1000): NatureEntry[] {
  const q = keyword.trim();
  if (!q) return SELECTABLE_NATURE_LIST.slice(0, limit);

  return SELECTABLE_NATURE_LIST.filter(
    (entry) =>
      entry.name.includes(q) ||
      (entry.up?.includes(q) ?? false) ||
      (entry.down?.includes(q) ?? false),
  ).slice(0, limit);
}
