/** 포챔스 learnset version_group 규칙 */

export type LearnsetMode = 'pochams' | 'standard';

export function isPochamsVersionGroup(
  versionGroup: string | null | undefined,
): boolean {
  const value = String(versionGroup ?? '').trim().toLowerCase();
  return value === 'pochams' || value === 'pochamps';
}

/** version_group 문자열에 no-pochams 포함 여부 */
export function isNoPochamsVersionGroup(
  versionGroup: string | null | undefined,
): boolean {
  return String(versionGroup ?? '')
    .trim()
    .toLowerCase()
    .includes('no-pochams');
}

/**
 * - pochams: version_group 이 pochams 일 때만
 * - standard: pochams 가 아닌 값 (no-pochams 포함, OFF에서 표시)
 *
 * no-pochams 는 ON 에서 제외되고 OFF 에서 포함됩니다.
 */
export function matchesLearnsetMode(
  versionGroup: string | null | undefined,
  mode: LearnsetMode,
): boolean {
  if (mode === 'pochams') {
    if (isNoPochamsVersionGroup(versionGroup)) return false;
    return isPochamsVersionGroup(versionGroup);
  }

  return !isPochamsVersionGroup(versionGroup);
}

export function learnsetModeFromPochampsActive(
  pochampsActive: boolean,
): LearnsetMode {
  return pochampsActive ? 'pochams' : 'standard';
}
