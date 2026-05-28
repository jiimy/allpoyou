/** PokeAPI 영문 name이 메가진화 폼인지 (-mega, -mega-x/y/z) */
export function isMegaEvolutionEnglishName(englishName: string): boolean {
  return /-mega(-[xyz])?$/.test(englishName);
}

/** DB 표시명이 메가진화 접두사(메가 )로 시작하는지 */
export function isMegaDisplayName(displayName: string): boolean {
  return displayName.startsWith('메가 ');
}
