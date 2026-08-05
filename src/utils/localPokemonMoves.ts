import type { MoveDbEntry } from '@/types/move';
import { getMovesByIds } from '@/utils/movesDb';
import { MOVES_BY_ID } from '@/utils/movesIndex';
import { getMoveLookupNameKo } from '@/utils/pokemonName';

type PokemonMoveLearnsetEntry = {
  move_id: number;
};

export type PokemonWithMovesRow = {
  id: number;
  number: number;
  name: string;
  moves: PokemonMoveLearnsetEntry[];
};

let cachedRows: PokemonWithMovesRow[] | null = null;
let loadPromise: Promise<PokemonWithMovesRow[]> | null = null;

/** public/data/pokemon-with-moves.json (한 번만 로드 후 캐시) */
export async function loadPokemonWithMovesLocal(): Promise<
  PokemonWithMovesRow[]
> {
  if (cachedRows) return cachedRows;
  if (!loadPromise) {
    loadPromise = fetch('/data/pokemon-with-moves.json')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            `pokemon-with-moves.json 로드 실패 (${res.status})`,
          );
        }
        const data = (await res.json()) as PokemonWithMovesRow[];
        if (!Array.isArray(data)) {
          throw new Error('pokemon-with-moves.json 형식이 올바르지 않습니다.');
        }
        cachedRows = data;
        return data;
      })
      .catch((err) => {
        loadPromise = null;
        throw err;
      });
  }
  return loadPromise;
}

function extractMoveIds(moves: PokemonMoveLearnsetEntry[] | undefined): number[] {
  return [
    ...new Set(
      (moves ?? [])
        .map((entry) => entry.move_id)
        .filter((id): id is number => typeof id === 'number'),
    ),
  ].sort((a, b) => a - b);
}

/**
 * 로컬 JSON만으로 배울 수 있는 기술 조회.
 * - pokemon-with-moves.json: 포켓몬 → move_id
 * - moves-db.json (MOVES_BY_ID): move_id → 기술 상세
 */
export async function getLearnableMovesFromLocalFiles(pokemon: {
  id: number;
  number: number;
  nameKo: string;
}): Promise<MoveDbEntry[]> {
  const rows = await loadPokemonWithMovesLocal();
  const nameKo = getMoveLookupNameKo(pokemon.nameKo);

  const row =
    rows.find((entry) => entry.name === nameKo) ??
    rows.find((entry) => entry.id === pokemon.number) ??
    rows.find((entry) => entry.number === pokemon.number) ??
    rows.find((entry) => entry.id === pokemon.id);

  if (!row) return [];

  return getMovesByIds(MOVES_BY_ID, extractMoveIds(row.moves));
}
