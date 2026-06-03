import type { MoveDbEntry } from '@/types/move';
import { buildMovesIndex } from '@/utils/movesDb';
import movesData from '../../public/data/moves-db.json';

const { all, byId } = buildMovesIndex(
  movesData as unknown as Record<string, MoveDbEntry>,
);

export const ALL_MOVES = all;
export const MOVES_BY_ID = byId;

export function getMoveById(id: number | null): MoveDbEntry | null {
  if (id == null) return null;
  return byId.get(id) ?? null;
}
