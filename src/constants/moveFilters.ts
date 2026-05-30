import { typeTranslation } from '@/constants/pokemonType';

/** moves-db.json `type` 필터 (영문 키) */
export const MOVE_TYPE_OPTIONS = Object.entries(typeTranslation).map(
  ([value, label]) => ({ value, label }),
);

export type MoveDamageClassFilter = 'all' | 'physical' | 'special' | 'status';

export const MOVE_DAMAGE_CLASS_OPTIONS: {
  value: MoveDamageClassFilter;
  label: string;
}[] = [
  { value: 'all', label: '전체' },
  { value: 'physical', label: '물리기' },
  { value: 'special', label: '특수기' },
  { value: 'status', label: '변화기' },
];
