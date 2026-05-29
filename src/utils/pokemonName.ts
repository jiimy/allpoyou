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
 * `-mega`, `-mega-x/y/z`, `-gmax` 접미사만 제거 (리전 폼 접미사는 유지).
 */
export function getBaseEnglishNameForDex(englishName: string): string {
  if (isMegaEvolutionEnglishName(englishName)) {
    return englishName.replace(/-mega(-[xyz])?$/, '');
  }
  if (isGmaxEnglishName(englishName)) {
    return englishName.replace(/-gmax$/, '');
  }
  return englishName;
}

/** DB 표시명이 메가진화 접두사(메가 )로 시작하는지 */
export function isMegaDisplayName(displayName: string): boolean {
  return displayName.startsWith('메가 ');
}
