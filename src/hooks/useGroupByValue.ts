export function useGroupByValue(data: Record<string, number>) {
  const grouped: Record<number, string[]> = {};

  // 데이터 값에 따라 그룹화
  Object.entries(data).forEach(([key, value]) => {
    if (!grouped[value]) {
      grouped[value] = [];
    }
    grouped[value].push(key);
  });

  // 결과를 키값을 기준으로 내림차순 정렬
  const sortedGroups = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a); // 내림차순 정렬

  // 출력
  const result = sortedGroups.map((value) => ({
    [`${value}배`]: grouped[value],
  }));

  return result;
}
