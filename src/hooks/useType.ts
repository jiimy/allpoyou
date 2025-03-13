// export function useTypeCounter() {

import { sortKeyValue } from "@/app/util/Sort";
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
