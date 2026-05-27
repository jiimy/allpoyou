// export function useTypeCounter() {

import { sortKeyValue } from "@/utils/Sort";
import { Type, typeChart, typeTranslation } from "@/constants/pokemonType";

// }
export function useTypeCounter(
  type1: Type,
  type2?: Type
): Record<Type, number> {
  if (!(type1 in typeChart)) {
    throw new Error("Invalid type entered.");
  }

  // if (!type2) {
  //   type2 = type1;
  // }

  const result: Record<Type, number> = {} as Record<Type, number>;

  // 타입 1과 타입 2가 각 속성에 대해 받는 데미지 배수 계산
  for (const otherType of Object.keys(typeChart) as Type[]) {
    // 각 타입의 상성 값 곱셈
    if (!type2) {
      result[typeTranslation[otherType]] = typeChart[type1][otherType];
    } else {
      result[typeTranslation[otherType]] =
        typeChart[type1][otherType] * typeChart[type2][otherType];
    }
  }

  return sortKeyValue(result);
}

export function useTypeReverseCounter() {}

const KOREAN_TO_ENGLISH: Record<string, string> = Object.fromEntries(
  Object.entries(typeTranslation).map(([en, ko]) => [ko, en])
);

// 선택한 포켓몬의 약점을 보완해주는 카운터 타입을 한글 배열로 반환.
// 조건:
//   1) 후보 타입이, 선택 포켓몬의 약점 타입 중 하나 이상을 2배 이상으로 공격할 수 있어야 함
//   2) 후보 타입이, 선택 포켓몬의 약점 타입 중 어느 것으로부터도 2배 이상 데미지를 받지 않아야 함
//      (받으면 같은 위협에 같이 맞아서 보완이 안됨. 예: 리자몽의 약점인 물에 땅도 2배라 제외)
export function getRecommendedCounters(koreanTypes: string[]): string[] {
  const englishTypes = koreanTypes
    .map((t) => KOREAN_TO_ENGLISH[t])
    .filter((t): t is Type => Boolean(t && t in typeChart));

  if (englishTypes.length === 0) return [];

  // 선택 포켓몬의 약점 타입(2배 이상 받는 공격 타입들, 영문)
  const weaknessTypes: Type[] = [];
  for (const attacker of Object.keys(typeChart) as Type[]) {
    let multiplier = 1;
    for (const defender of englishTypes) {
      multiplier *= typeChart[defender][attacker] ?? 1;
    }
    if (multiplier >= 2) weaknessTypes.push(attacker);
  }

  if (weaknessTypes.length === 0) return [];

  const result: string[] = [];
  for (const candidate of Object.keys(typeChart) as Type[]) {
    const canAttack = weaknessTypes.some(
      (weak) => (typeChart[weak][candidate] ?? 1) >= 2
    );
    if (!canAttack) continue;

    const safeAgainstWeakness = weaknessTypes.every(
      (weak) => (typeChart[candidate][weak] ?? 1) < 2
    );
    if (!safeAgainstWeakness) continue;

    result.push(typeTranslation[candidate]);
  }

  return result;
}
