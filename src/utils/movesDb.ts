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
