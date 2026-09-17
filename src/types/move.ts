export type MoveDamageClass = 'physical' | 'special' | 'status' | string;

/** 숫자 또는 포챔스/기본 분기 값 */
export type MoveStatVariant = {
  default: number | null;
  pochams: number | null;
};

export type MoveStatValue = number | null | MoveStatVariant;

export type MoveDbEntry = {
  id: number;
  englishName: string;
  koreanName: string;
  description: string;
  type: string;
  damage_class: MoveDamageClass;
  power: MoveStatValue;
  accuracy: number | null;
  pp: MoveStatValue;
};

export type MovesDb = Record<string, MoveDbEntry>;
