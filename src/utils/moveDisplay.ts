import { typeTranslation } from '@/constants/pokemonType';
import type { MoveSortDirection, MoveSortKey } from '@/constants/moveFilters';
import type { MoveDbEntry, MoveStatValue } from '@/types/move';

export function getMoveTypeKo(englishType: string): string {
  return typeTranslation[englishType] ?? englishType;
}

export function getDamageClassLabel(damageClass: string): string {
  switch (damageClass) {
    case 'special':
      return '특수기';
    case 'status':
      return '변화기';
    case 'physical':
      return '물리기';
    default:
      return damageClass;
  }
}

export function isMoveStatVariant(
  value: MoveStatValue,
): value is { default: number | null; pochams: number | null } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'default' in value &&
    'pochams' in value
  );
}

/** 포챔스 ON이면 pochams, OFF면 default. 숫자/null은 그대로. */
export function resolveMoveStat(
  value: MoveStatValue,
  pochampsActive = false,
): number | null {
  if (value == null || typeof value === 'number') return value;
  if (!isMoveStatVariant(value)) return null;
  const preferred = pochampsActive ? value.pochams : value.default;
  if (preferred != null) return preferred;
  return pochampsActive ? value.default : value.pochams;
}

export function formatMoveStat(value: number | null): string {
  return value === null ? '-' : String(value);
}

export function sortMovesByKoreanName(moves: MoveDbEntry[]): MoveDbEntry[] {
  return sortMoves(moves, 'name', 'asc');
}

function compareKorean(a: string, b: string, direction: MoveSortDirection): number {
  const cmp = a.localeCompare(b, 'ko');
  return direction === 'asc' ? cmp : -cmp;
}

function comparePower(
  a: number | null,
  b: number | null,
  direction: MoveSortDirection,
): number {
  // null(변화기 등)은 항상 뒤로
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return direction === 'asc' ? a - b : b - a;
}

export function sortMoves(
  moves: MoveDbEntry[],
  key: MoveSortKey,
  direction: MoveSortDirection,
  pochampsActive = false,
): MoveDbEntry[] {
  return [...moves].sort((a, b) => {
    let primary = 0;
    if (key === 'name') {
      primary = compareKorean(a.koreanName, b.koreanName, direction);
    } else if (key === 'type') {
      primary = compareKorean(
        getMoveTypeKo(a.type),
        getMoveTypeKo(b.type),
        direction,
      );
    } else {
      primary = comparePower(
        resolveMoveStat(a.power, pochampsActive),
        resolveMoveStat(b.power, pochampsActive),
        direction,
      );
    }
    if (primary !== 0) return primary;
    // 동률이면 이름 ㄱ~ㅎ
    return a.koreanName.localeCompare(b.koreanName, 'ko');
  });
}

/** 기술 분류·위력·명중률을 title/tooltip용 한 줄 문자열로 반환 */
export function getMoveStatsTitle(
  move: Pick<MoveDbEntry, 'damage_class' | 'power' | 'accuracy'>,
  pochampsActive = false,
): string {
  return [
    `${getDamageClassLabel(move.damage_class)}`,
    `위력 ${formatMoveStat(resolveMoveStat(move.power, pochampsActive))}`,
    `명중률 ${formatMoveStat(move.accuracy)}`,
  ].join(' · ');
}
