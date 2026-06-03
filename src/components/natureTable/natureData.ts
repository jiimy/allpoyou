export const STAT_LABELS = ['공격', '방어', '특공', '특방', '스피드'] as const;

export type StatLabel = (typeof STAT_LABELS)[number];

/** [상승 능력치 행][하락 능력치 열] */
export const NATURE_GRID: readonly (readonly string[])[] = [
  ['노력', '외로움', '고집', '개구쟁이', '용감'],
  ['대담', '온순', '장난꾸러기', '촐량', '무사태평'],
  ['조심', '의젓', '수줍음', '덜렁', '냉정'],
  ['차분', '얌전', '신중', '변덕', '건방'],
  ['겁쟁이', '성급', '명함', '천진난만', '성실'],
] as const;

export const STAT_THEME: Record<
  StatLabel,
  { accent: string; soft: string }
> = {
  공격: { accent: '#f67f08', soft: '#fff4e8' },
  방어: { accent: '#efb906', soft: '#fff9e6' },
  특공: { accent: '#419c2c', soft: '#eef7ea' },
  특방: { accent: '#2c7de5', soft: '#eaf2fc' },
  스피드: { accent: '#e771e7', soft: '#fceefb' },
};
