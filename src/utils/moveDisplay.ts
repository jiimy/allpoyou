import { typeTranslation } from '@/constants/pokemonType';
import type { MoveDbEntry } from '@/types/move';

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

export function formatMoveStat(value: number | null): string {
  return value === null ? '-' : String(value);
}

/** 기술 분류·위력·명중률을 title/tooltip용 한 줄 문자열로 반환 */
export function getMoveStatsTitle(
  move: Pick<MoveDbEntry, 'damage_class' | 'power' | 'accuracy'>,
): string {
  return [
    `${getDamageClassLabel(move.damage_class)}`,
    `위력 ${formatMoveStat(move.power)}`,
    `명중률 ${formatMoveStat(move.accuracy)}`,
  ].join(' · ');
}
