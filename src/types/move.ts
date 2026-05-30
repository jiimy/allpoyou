export type MoveDamageClass = 'physical' | 'special' | 'status' | string;

export type MoveDbEntry = {
  id: number;
  englishName: string;
  koreanName: string;
  description: string;
  type: string;
  damage_class: MoveDamageClass;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
};

export type MovesDb = Record<string, MoveDbEntry>;
