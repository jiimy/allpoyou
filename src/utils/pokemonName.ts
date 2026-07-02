/** PokeAPI 영문 name이 메가진화 폼인지 (-mega, -mega-x/y/z) */
export function isMegaEvolutionEnglishName(englishName: string): boolean {
  return /-mega(-[xyz])?$/.test(englishName);
}

/** PokeAPI 영문 name이 거다이맥스 폼인지 */
export function isGmaxEnglishName(englishName: string): boolean {
  return englishName.endsWith('-gmax');
}

/**
 * 전국도감 번호 공유용 기준 영문명.
 * 메가/거다이/리전 폼 접미사를 제거해 같은 종족끼리 number를 공유합니다.
 */
export function getBaseEnglishNameForDex(englishName: string): string {
  let base = englishName;

  if (isMegaEvolutionEnglishName(base)) {
    base = base.replace(/-mega(-[xyz])?$/, '');
  } else if (isGmaxEnglishName(base)) {
    base = base.replace(/-gmax$/, '');
  }

  return base.replace(
    /-(?:paldea-(?:aqua|blaze|combat)-breed|paldea|galar-(?:standard|zen)|galar|totem-alola|alola|hisui)$/,
    '',
  );
}

/** DB 표시명이 메가진화 접두사(메가 )로 시작하는지 */
export function isMegaDisplayName(displayName: string): boolean {
  return displayName.startsWith('메가 ');
}

const MEGA_NAME_PREFIX = '메가 ';
const MEGA_XY_SUFFIXES = [' X', ' Y', ' Z'] as const;

/**
 * 기술 목록 조회용 한글 이름.
 * `메가 ` 접두사와 ` X`/` Y`/` Z` 접미사를 제거합니다.
 * 예: 메가 리자몽 X → 리자몽, 메가 메가니움 → 메가니움
 */
export function getMoveLookupNameKo(nameKo: string): string {
  let name = nameKo;
  if (name.startsWith(MEGA_NAME_PREFIX)) {
    name = name.slice(MEGA_NAME_PREFIX.length);
  }
  for (const suffix of MEGA_XY_SUFFIXES) {
    if (name.endsWith(suffix)) {
      return name.slice(0, -suffix.length);
    }
  }
  return name;
}

/** 배울 수 있는 기술 조회에 사용할 포켓몬 id (메가/X/Y/Z 폼 → 일반 형태) */
export function resolveMoveLookupPokemonId(
  pokemon: { id: number; nameKo: string },
  pokemonList: { id: number; nameKo: string }[],
): number {
  const lookupName = getMoveLookupNameKo(pokemon.nameKo);
  if (lookupName === pokemon.nameKo) {
    return pokemon.id;
  }

  const baseForm = pokemonList.find((entry) => entry.nameKo === lookupName);
  return baseForm?.id ?? pokemon.id;
}
