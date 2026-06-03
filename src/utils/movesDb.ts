import type { MoveDbEntry } from '@/types/move';

export function buildMovesIndex(data: Record<string, MoveDbEntry>) {
  const all = Object.values(data).sort((a, b) => a.id - b.id);
  const byId = new Map<number, MoveDbEntry>();
  for (const move of all) {
    byId.set(move.id, move);
  }
  return { all, byId };
}

export function getMovesByIds(
  byId: Map<number, MoveDbEntry>,
  moveIds: Iterable<number>,
): MoveDbEntry[] {
  const result: MoveDbEntry[] = [];
  const seen = new Set<number>();
  for (const id of moveIds) {
    if (seen.has(id)) continue;
    seen.add(id);
    const move = byId.get(id);
    if (move) result.push(move);
  }
  return result.sort((a, b) => a.id - b.id);
}

/**
 * 포켓몬이 배울 수 있는 기술 목록을 키워드로 검색합니다.
 * - 이미 적용된 기술(excludeIds)은 제외합니다.
 */
export function searchLearnableMoves(
  moves: MoveDbEntry[],
  keyword: string,
  excludeIds: Set<number>,
  limit = 50,
): MoveDbEntry[] {
  const q = keyword.trim();
  const qLower = q.toLowerCase();
  const result: MoveDbEntry[] = [];

  for (const move of moves) {
    if (excludeIds.has(move.id)) continue;
    if (
      q &&
      !move.koreanName.includes(q) &&
      !move.englishName.toLowerCase().includes(qLower)
    ) {
      continue;
    }
    result.push(move);
    if (result.length >= limit) break;
  }

  return result;
}
