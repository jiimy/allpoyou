// export function useTypeCounter() {

import { sortKeyValue } from "@/utils/Sort";
import {
  Type,
  isTypeTableStrengthMultiplier,
  typeChart,
  typeTranslation,
} from "@/constants/pokemonType";

export { isTypeTableStrengthMultiplier };

// }
export function useTypeCounter(
  type1: Type,
  type2?: Type
): Record<Type, number> {
  return getDefenseTypeEffectiveness(type1, type2);
}

/** 방어 타입(1~2개) 기준 — 공격 타입별 데미지 배율 */
export function getDefenseTypeEffectiveness(
  type1: Type,
  type2?: Type,
): Record<string, number> {
  if (!(type1 in typeChart)) {
    throw new Error('Invalid type entered.');
  }

  const result: Record<string, number> = {};

  for (const otherType of Object.keys(typeChart) as Type[]) {
    if (!type2) {
      result[typeTranslation[otherType]] = typeChart[type1][otherType];
    } else {
      result[typeTranslation[otherType]] =
        typeChart[type1][otherType] * typeChart[type2][otherType];
    }
  }

  return sortKeyValue(result);
}

/** 공격 타입 기준 — 방어 타입별 데미지 배율 */
export function getAttackTypeEffectiveness(
  attackType: Type,
): Record<string, number> {
  if (!(attackType in typeChart)) {
    throw new Error('Invalid type entered.');
  }

  const result: Record<string, number> = {};

  for (const defender of Object.keys(typeChart) as Type[]) {
    result[typeTranslation[defender]] = typeChart[defender][attackType] ?? 1;
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

  return buildCounterResultFromWeaknesses(getWeaknessTypes(englishTypes));
}

function getDefenseMultiplierAgainst(
  defenderTypes: Type[],
  attackType: Type,
): number {
  let mult = 1;
  for (const def of defenderTypes) {
    mult *= typeChart[def][attackType] ?? 1;
  }
  return mult;
}

/**
 * 파티 전체 약점 보완(ON):
 * 1) 상성표 강점(0 / 0.5)이 없는 공격 타입(구멍)을 찾음
 * 2) 그 공격을 ≤0.5배로 받는 방어 타입을 후보로 모음
 * 3) 이미 파티에 있는 타입은 제외
 * 4) 구멍 공격에 2배 이상 약점이 있는 타입은 제외
 *    (단, 구멍에 대한 면역(0배)이 있고 ≤0.5 저항이 2개 이상이면 유지 — 예: 강철)
 * 5) 남은 타입을 기존 추천처럼 뱃지·포켓몬 매칭에 사용
 */
export function getPartyResistHoleDetails(
  partyKoreanTypes: string[][],
): RecommendedCounterResult {
  const members = partyKoreanTypes
    .map((koreanTypes) =>
      koreanTypes
        .map((t) => KOREAN_TO_ENGLISH[t])
        .filter((t): t is Type => Boolean(t && t in typeChart)),
    )
    .filter((types) => types.length > 0);

  if (members.length === 0) {
    return { weaknesses: [], counters: [] };
  }

  const partyTypeSet = new Set<Type>();
  for (const defs of members) {
    for (const t of defs) partyTypeSet.add(t);
  }

  const holeAttackTypes: Type[] = [];
  for (const attacker of Object.keys(typeChart) as Type[]) {
    const partyHasStrength = members.some((defs) =>
      isTypeTableStrengthMultiplier(
        getDefenseMultiplierAgainst(defs, attacker),
      ),
    );
    if (!partyHasStrength) {
      holeAttackTypes.push(attacker);
    }
  }

  if (holeAttackTypes.length === 0) {
    return { weaknesses: [], counters: [] };
  }

  const candidateDefs = new Set<Type>();
  for (const attacker of holeAttackTypes) {
    for (const defender of Object.keys(typeChart) as Type[]) {
      const mult = typeChart[defender][attacker] ?? 1;
      if (mult <= 0.5) candidateDefs.add(defender);
    }
  }

  const recommendedDefs = [...candidateDefs].filter((defender) => {
    if (partyTypeSet.has(defender)) return false;

    const vsHoles = holeAttackTypes.map(
      (attacker) => typeChart[defender][attacker] ?? 1,
    );
    const hasWeakness = vsHoles.some((m) => m >= 2);
    if (!hasWeakness) return true;

    // 면역으로 구멍을 메우면서 저항도 충분한 타입(강철 등)은 유지
    const resistCount = vsHoles.filter((m) => m <= 0.5).length;
    const hasImmune = vsHoles.some((m) => m === 0);
    return hasImmune && resistCount >= 2;
  });

  if (recommendedDefs.length === 0) {
    return { weaknesses: [], counters: [] };
  }

  const counters: CounterDetail[] = recommendedDefs
    .map((defender) => {
      const factors = holeAttackTypes.map((attacker) => ({
        weakness: typeTranslation[attacker],
        multiplier: typeChart[defender][attacker] ?? 1,
      }));
      const resistFactors = factors.filter((f) => f.multiplier <= 0.5);
      const resistCount = resistFactors.length;
      const immuneCount = resistFactors.filter((f) => f.multiplier === 0)
        .length;

      return {
        detail: {
          type: typeTranslation[defender],
          product: resistCount,
          factors: resistFactors.length > 0 ? resistFactors : factors,
        } satisfies CounterDetail,
        sortKey: resistCount * 10 + immuneCount,
      };
    })
    .sort((a, b) => b.sortKey - a.sortKey)
    .map((entry) => entry.detail);

  const weaknesses: WeaknessMatchupGroup[] = holeAttackTypes.map(
    (attacker) => {
      const superEffective: string[] = [];
      const notVeryEffective: string[] = [];
      const noEffect: string[] = [];
      for (const defender of recommendedDefs) {
        const mult = typeChart[defender][attacker] ?? 1;
        const label = typeTranslation[defender];
        if (mult === 0) noEffect.push(label);
        else if (mult <= 0.5) notVeryEffective.push(label);
        else if (mult >= 2) superEffective.push(label);
      }
      return {
        weakness: typeTranslation[attacker],
        superEffective,
        notVeryEffective,
        noEffect,
      };
    },
  );

  return { weaknesses, counters };
}

/** @deprecated 파티 보완은 getPartyResistHoleDetails 를 사용 */
export function getPartyRecommendedCounterDetails(
  partyKoreanTypes: string[][],
): RecommendedCounterResult {
  return getPartyResistHoleDetails(partyKoreanTypes);
}

/**
 * 포켓몬이 주어진 공격 타입(한글)들을 타입 상성표 강점(0 / 0.5)으로
 * 받는지 개수를 셉니다.
 */
export function countResistedAttackTypes(
  pokemonKoreanTypes: string[],
  attackTypesKo: string[],
): number {
  const defs = pokemonKoreanTypes
    .map((t) => KOREAN_TO_ENGLISH[t])
    .filter((t): t is Type => Boolean(t && t in typeChart));
  if (defs.length === 0) return 0;

  let count = 0;
  for (const attackKo of attackTypesKo) {
    const attacker = KOREAN_TO_ENGLISH[attackKo];
    if (!attacker || !(attacker in typeChart)) continue;
    if (
      isTypeTableStrengthMultiplier(
        getDefenseMultiplierAgainst(defs, attacker),
      )
    ) {
      count += 1;
    }
  }
  return count;
}

export function formatResistHoleLabel(detail: CounterDetail): string {
  const parts = detail.factors.map((f) => {
    const multLabel =
      f.multiplier === 0 ? '0배' : f.multiplier === 0.5 ? '0.5배' : `${f.multiplier}배`;
    return `${f.weakness} ${multLabel}`;
  });
  return parts.length > 0
    ? `${detail.type} — ${parts.join(', ')}`
    : detail.type;
}

function buildCounterResultFromWeaknesses(
  weaknessTypes: Type[],
): RecommendedCounterResult {
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
