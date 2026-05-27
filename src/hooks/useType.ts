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

export type WeaknessMatchupGroup = {
  weakness: string;
  superEffective: string[];
  notVeryEffective: string[];
  noEffect: string[];
};

export type CounterDetail = {
  type: string;
  product: number;
  factors: { weakness: string; multiplier: number }[];
};

export type RecommendedCounterResult = {
  weaknesses: WeaknessMatchupGroup[];
  counters: CounterDetail[];
};

function getWeaknessTypes(englishTypes: Type[]): Type[] {
  const weaknessTypes: Type[] = [];
  for (const attacker of Object.keys(typeChart) as Type[]) {
    let multiplier = 1;
    for (const defender of englishTypes) {
      multiplier *= typeChart[defender][attacker] ?? 1;
    }
    if (multiplier >= 2) weaknessTypes.push(attacker);
  }
  return weaknessTypes;
}

function buildWeaknessMatchups(weaknessTypes: Type[]): WeaknessMatchupGroup[] {
  return weaknessTypes.map((weak) => {
    const superEffective: string[] = [];
    const notVeryEffective: string[] = [];
    const noEffect: string[] = [];

    for (const candidate of Object.keys(typeChart) as Type[]) {
      const mult = typeChart[weak][candidate] ?? 1;
      const label = typeTranslation[candidate];
      if (mult >= 2) superEffective.push(label);
      else if (mult === 0) noEffect.push(label);
      else if (mult === 0.5) notVeryEffective.push(label);
    }

    return {
      weakness: typeTranslation[weak],
      superEffective,
      notVeryEffective,
      noEffect,
    };
  });
}

// 선택한 포켓몬의 약점을 보완해주는 카운터 타입을 계산.
// 각 약점 타입에 대한 공격 배율을 모두 곱해 2배 이상인 타입만 추천.
export function getRecommendedCounterDetails(
  koreanTypes: string[],
): RecommendedCounterResult {
  const englishTypes = koreanTypes
    .map((t) => KOREAN_TO_ENGLISH[t])
    .filter((t): t is Type => Boolean(t && t in typeChart));

  if (englishTypes.length === 0) {
    return { weaknesses: [], counters: [] };
  }

  const weaknessTypes = getWeaknessTypes(englishTypes);
  if (weaknessTypes.length === 0) {
    return { weaknesses: [], counters: [] };
  }

  const weaknesses = buildWeaknessMatchups(weaknessTypes);

  const counters: CounterDetail[] = [];
  for (const candidate of Object.keys(typeChart) as Type[]) {
    const factors = weaknessTypes.map((weak) => ({
      weakness: typeTranslation[weak],
      multiplier: typeChart[weak][candidate] ?? 1,
    }));

    const product = factors.reduce((acc, f) => acc * f.multiplier, 1);
    if (product < 2) continue;

    counters.push({
      type: typeTranslation[candidate],
      product,
      factors,
    });
  }

  counters.sort((a, b) => b.product - a.product);

  return { weaknesses, counters };
}

export function getRecommendedCounters(koreanTypes: string[]): string[] {
  return getRecommendedCounterDetails(koreanTypes).counters.map((c) => c.type);
}

export function formatCounterProduct(detail: CounterDetail): string {
  const nonNeutral = detail.factors.filter((f) => f.multiplier !== 1);
  const displayFactors = nonNeutral.length > 0 ? nonNeutral : detail.factors;

  const labels = displayFactors.map((f) => {
    const multLabel =
      f.multiplier === 0.5 ? '0.5배' : `${f.multiplier}배`;
    return `${f.weakness} ${multLabel}`;
  });

  const formula = displayFactors.map((f) => String(f.multiplier)).join('×');
  return `${labels.join(', ')} = ${formula} = ${detail.product}`;
}
