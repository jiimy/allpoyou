import type { MoveDbEntry } from '@/types/move';
import {
  isNoPochamsVersionGroup,
  isPochamsVersionGroup,
  learnsetModeFromPochampsActive,
  matchesLearnsetMode,
  type LearnsetMode,
} from '@/utils/learnsetVersionGroup';
import { getMovesByIds } from '@/utils/movesDb';
import { MOVES_BY_ID } from '@/utils/movesIndex';
import { getMoveLookupNameKo } from '@/utils/pokemonName';

type PokemonMoveLearnsetEntry = {
  move_id: number;
  version_group?: string;
};

export type PokemonWithMovesRow = {
  id: number;
  number: number;
  name: string;
  moves: PokemonMoveLearnsetEntry[];
};

export type LocalLearnsetOverlay = {
  pochamsMoveIds: number[];
  noPochamsMoveIds: number[];
};

let cachedRows: PokemonWithMovesRow[] | null = null;
let loadPromise: Promise<PokemonWithMovesRow[]> | null = null;

/** public/data/pokemon-with-moves.json (한 번만 로드 후 캐시) */
export async function loadPokemonWithMovesLocal(): Promise<
  PokemonWithMovesRow[]
> {
  if (cachedRows) return cachedRows;
  if (!loadPromise) {
    loadPromise = fetch('/data/pokemon-with-moves.json', { cache: 'no-store' })
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

function extractMoveIds(
  moves: PokemonMoveLearnsetEntry[] | undefined,
  mode: LearnsetMode,
): number[] {
  return [
    ...new Set(
      (moves ?? [])
        .filter((entry) => matchesLearnsetMode(entry.version_group, mode))
        .map((entry) => entry.move_id)
        .filter((id): id is number => typeof id === 'number'),
    ),
  ].sort((a, b) => a - b);
}

function findPokemonMovesRow(
  rows: PokemonWithMovesRow[],
  pokemon: { id: number; number: number; nameKo: string },
): PokemonWithMovesRow | undefined {
  const nameKo = getMoveLookupNameKo(pokemon.nameKo);
  return (
    rows.find((entry) => entry.name === nameKo) ??
    rows.find((entry) => entry.id === pokemon.number) ??
    rows.find((entry) => entry.number === pokemon.number) ??
    rows.find((entry) => entry.id === pokemon.id)
  );
}

function uniqueSortedIds(ids: number[]): number[] {
  return [...new Set(ids)].sort((a, b) => a - b);
}

/**
 * 로컬 JSON만으로 배울 수 있는 기술 조회.
 * - pokemon-with-moves.json: 포켓몬 → move_id
 * - moves-db.json (MOVES_BY_ID): move_id → 기술 상세
 * - pochampsActive ON: version_group=pochams 만
 * - pochampsActive OFF: pochams 제외 (no-pochams 포함)
 */
export async function getLearnableMovesFromLocalFiles(
  pokemon: {
    id: number;
    number: number;
    nameKo: string;
  },
  options?: { pochampsActive?: boolean },
): Promise<MoveDbEntry[]> {
  const rows = await loadPokemonWithMovesLocal();
  const mode = learnsetModeFromPochampsActive(options?.pochampsActive === true);
  const row = findPokemonMovesRow(rows, pokemon);
  if (!row) return [];

  return getMovesByIds(MOVES_BY_ID, extractMoveIds(row.moves, mode));
}

/**
 * 포챔스 ON용 로컬 오버레이.
 * - pochams: Storage learnset에 합칠 추가 기술
 * - no-pochams: Storage learnset에서 뺄 기술
 */
export async function getLocalLearnsetOverlay(
  pokemon: {
    id: number;
    number: number;
    nameKo: string;
  },
): Promise<LocalLearnsetOverlay> {
  const rows = await loadPokemonWithMovesLocal();
  const row = findPokemonMovesRow(rows, pokemon);
  if (!row) {
    return { pochamsMoveIds: [], noPochamsMoveIds: [] };
  }

  const pochamsMoveIds: number[] = [];
  const noPochamsMoveIds: number[] = [];

  for (const entry of row.moves ?? []) {
    if (typeof entry.move_id !== 'number') continue;
    if (isNoPochamsVersionGroup(entry.version_group)) {
      noPochamsMoveIds.push(entry.move_id);
      continue;
    }
    if (isPochamsVersionGroup(entry.version_group)) {
      pochamsMoveIds.push(entry.move_id);
    }
  }

  return {
    pochamsMoveIds: uniqueSortedIds(pochamsMoveIds),
    noPochamsMoveIds: uniqueSortedIds(noPochamsMoveIds),
  };
}

/** Storage learnset + 로컬 pochams − 로컬 no-pochams */
export function mergePochampsLearnset(
  storageMoves: MoveDbEntry[],
  overlay: LocalLearnsetOverlay,
): MoveDbEntry[] {
  const byId = new Map<number, MoveDbEntry>();
  for (const move of storageMoves) {
    byId.set(move.id, move);
  }
  for (const id of overlay.pochamsMoveIds) {
    const move = MOVES_BY_ID.get(id);
    if (move) byId.set(id, move);
  }
  for (const id of overlay.noPochamsMoveIds) {
    byId.delete(id);
  }
  return [...byId.values()].sort((a, b) => a.id - b.id);
}

/** 특정 기술을 배울 수 있는 포켓몬 (로컬 JSON + learnset mode) */
export async function getLearnersFromLocalFiles(
  moveIds: number[],
  options?: { pochampsActive?: boolean },
): Promise<Array<{ id: number; number: number; nameKo: string }>> {
  if (moveIds.length === 0) return [];

  const rows = await loadPokemonWithMovesLocal();
  const target = new Set(moveIds);
  const mode = learnsetModeFromPochampsActive(options?.pochampsActive === true);
  const pokemon: Array<{ id: number; number: number; nameKo: string }> = [];

  for (const row of rows) {
    const hasMove = (row.moves ?? []).some(
      (entry) =>
        target.has(entry.move_id) &&
        matchesLearnsetMode(entry.version_group, mode),
    );
    if (!hasMove) continue;
    pokemon.push({
      id: row.id,
      number: row.number,
      nameKo: row.name,
    });
  }

  return pokemon.sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));
}

/** ON에서 제외할 포켓몬 (해당 기술에 no-pochams 태그가 있는 경우) */
export async function getNoPochamsLearnerNameKos(
  moveIds: number[],
): Promise<Set<string>> {
  if (moveIds.length === 0) return new Set();

  const rows = await loadPokemonWithMovesLocal();
  const target = new Set(moveIds);
  const names = new Set<string>();

  for (const row of rows) {
    const blocked = (row.moves ?? []).some(
      (entry) =>
        target.has(entry.move_id) &&
        isNoPochamsVersionGroup(entry.version_group),
    );
    if (blocked) names.add(row.name);
  }

  return names;
}
