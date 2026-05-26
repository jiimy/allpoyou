export function sortKeyValue(data: Record<string, number>): Record<string, number> {
  return Object.entries(data)
    .sort(([, valueA], [, valueB]) => valueB - valueA) // valueB - valueA로 내림차순 정렬
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, number>);
}