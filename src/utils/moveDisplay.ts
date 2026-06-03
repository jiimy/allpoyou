import { typeTranslation } from '@/constants/pokemonType';

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
