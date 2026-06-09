'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type SetStateAction,
} from 'react';
import {
  getAbilitySummary,
  getDefaultAbility,
  type TeamProps,
} from '@/components/team/Team';
import {
  fetchPokemonList,
  searchPokemonByName,
  type Pokemon,
} from '@/store/PokemonStore';
import {
  buildPokemonsFromEditor,
  getAbilityNameById,
} from '@/store/pokemonTeamMappers';
import {
  EV_STAT_MAX,
  EV_TOTAL_MAX,
  MAX_TEAMS,
  TEAM_SLOT_COUNT,
  createEmptyEvs,
  type EvStatKey,
  type SavedTeam,
  type TeamPokemonEvs,
  type TeamPokemonSlot,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';
import { useItemPickStore } from '@/store/ItemPickStore';
import { usePokemonPickStore } from '@/store/PokemonPickStore';
import { useMovePickStore } from '@/store/MovePickStore';
import { useNaturePickStore } from '@/store/NaturePickStore';
import { getItemNameKoById, searchHeldItems } from '@/utils/itemSearch';
import { isValidNature, searchNatures, type NatureEntry } from '@/utils/natureList';
import { getMovesByIds, searchLearnableMoves } from '@/utils/movesDb';
import { MOVES_BY_ID, getMoveById } from '@/utils/movesIndex';
import { normalizePokemon } from '@/utils/pokemonNormalize';
import type { ItemKr } from '@/types/item';
import type { MoveDbEntry } from '@/types/move';

export const MOVE_SLOT_COUNT = 4;

export type ActiveMoveSlot = { pokemon: number; move: number } | null;

/** 노력치 조절 동작: +1 / -1 / 최대로 / 0으로 */
export type EvAdjustAction = 'inc' | 'dec' | 'max' | 'min';

function createEmptyMoveSlots<T>(value: T): T[] {
  return Array.from({ length: MOVE_SLOT_COUNT }, () => value);
}

const subscribeNoop = () => () => {};

function useIsClient() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

function createEmptyEditorState() {
  return {
    values: Array.from({ length: TEAM_SLOT_COUNT }, () => ''),
    selectedPokemons: Array.from(
      { length: TEAM_SLOT_COUNT },
      () => null,
    ) as (Pokemon | null)[],
    selectedAbilities: Array.from(
      { length: TEAM_SLOT_COUNT },
      () => null,
    ) as (string | null)[],
    abilitySummaries: Array.from(
      { length: TEAM_SLOT_COUNT },
      () => null,
    ) as (string | null)[],
    selectedItemIds: Array.from(
      { length: TEAM_SLOT_COUNT },
      () => null,
    ) as (number | null)[],
    itemSearchValues: Array.from({ length: TEAM_SLOT_COUNT }, () => ''),
    selectedNatures: Array.from(
      { length: TEAM_SLOT_COUNT },
      () => null,
    ) as (string | null)[],
    natureSearchValues: Array.from({ length: TEAM_SLOT_COUNT }, () => ''),
    selectedMoveIds: Array.from({ length: TEAM_SLOT_COUNT }, () =>
      createEmptyMoveSlots<number | null>(null),
    ) as (number | null)[][],
    moveSearchValues: Array.from({ length: TEAM_SLOT_COUNT }, () =>
      createEmptyMoveSlots<string>(''),
    ) as string[][],
    selectedEvs: Array.from(
      { length: TEAM_SLOT_COUNT },
      () => createEmptyEvs(),
    ) as TeamPokemonEvs[],
  };
}

function pokemonFromStoredSlot(slot: TeamPokemonSlot): Pokemon {
  return {
    id: slot.pokemonId,
    number: slot.pokemonId,
    name: slot.nameEn,
    nameKo: slot.nameKo,
    types: slot.types,
    H: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    S: 0,
    total: 0,
    images: [],
    ability: [],
    s_ability: [],
  };
}

function editorStateFromTeam(
  activeTeam: SavedTeam | undefined,
  allPokemons: Pokemon[],
) {
  const state = createEmptyEditorState();

  if (!activeTeam) return state;

  activeTeam.pokemons.forEach((slot, index) => {
    if (!slot?.pokemonId) return;

    const pokemon =
      allPokemons.find((entry) => entry.id === slot.pokemonId) ??
      pokemonFromStoredSlot(slot);

    const abilityName =
      getAbilityNameById(slot.abilityId) ?? getDefaultAbility(pokemon);
    const itemName = getItemNameKoById(slot.itemId);

    state.values[index] = pokemon.nameKo;
    state.selectedPokemons[index] = pokemon;
    state.selectedAbilities[index] = abilityName;
    state.abilitySummaries[index] = getAbilitySummary(abilityName);
    state.selectedItemIds[index] = slot.itemId ?? null;
    state.itemSearchValues[index] = itemName ?? '';
    state.selectedNatures[index] = slot.nature ?? null;
    state.natureSearchValues[index] = slot.nature ?? '';

    const savedMoves = Array.isArray(slot.moves) ? slot.moves : [];
    const moveIds = createEmptyMoveSlots<number | null>(null);
    const moveSearches = createEmptyMoveSlots<string>('');
    savedMoves.slice(0, MOVE_SLOT_COUNT).forEach((moveId, moveIndex) => {
      moveIds[moveIndex] = moveId;
      moveSearches[moveIndex] = getMoveById(moveId)?.koreanName ?? '';
    });
    state.selectedMoveIds[index] = moveIds;
    state.moveSearchValues[index] = moveSearches;
    state.selectedEvs[index] = slot.evs ?? createEmptyEvs();
  });

  return state;
}

function applyEditorState(
  state: ReturnType<typeof createEmptyEditorState>,
  setters: {
    setValues: Dispatch<SetStateAction<string[]>>;
    setSelectedPokemons: Dispatch<SetStateAction<(Pokemon | null)[]>>;
    setSelectedAbilities: Dispatch<SetStateAction<(string | null)[]>>;
    setAbilitySummaries: Dispatch<SetStateAction<(string | null)[]>>;
    setSelectedItemIds: Dispatch<SetStateAction<(number | null)[]>>;
    setItemSearchValues: Dispatch<SetStateAction<string[]>>;
    setSelectedNatures: Dispatch<SetStateAction<(string | null)[]>>;
    setNatureSearchValues: Dispatch<SetStateAction<string[]>>;
    setSelectedMoveIds: Dispatch<SetStateAction<(number | null)[][]>>;
    setMoveSearchValues: Dispatch<SetStateAction<string[][]>>;
    setSelectedEvs: Dispatch<SetStateAction<TeamPokemonEvs[]>>;
  },
) {
  setters.setValues(state.values);
  setters.setSelectedPokemons(state.selectedPokemons);
  setters.setSelectedAbilities(state.selectedAbilities);
  setters.setAbilitySummaries(state.abilitySummaries);
  setters.setSelectedItemIds(state.selectedItemIds);
  setters.setItemSearchValues(state.itemSearchValues);
  setters.setSelectedNatures(state.selectedNatures);
  setters.setNatureSearchValues(state.natureSearchValues);
  setters.setSelectedMoveIds(state.selectedMoveIds);
  setters.setMoveSearchValues(state.moveSearchValues);
  setters.setSelectedEvs(state.selectedEvs);
}

export function useTeamEditor(options?: { teamsSourceReady?: boolean }) {
  const teamsSourceReady = options?.teamsSourceReady ?? true;
  const serverTeamsLoadedAt = usePokemonTeamStore(
    (state) => state.serverTeamsLoadedAt,
  );
  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: TEAM_SLOT_COUNT }, () => ''),
  );
  const [selectedPokemons, setSelectedPokemons] = useState<(Pokemon | null)[]>(
    () => Array.from({ length: TEAM_SLOT_COUNT }, () => null),
  );
  const [selectedAbilities, setSelectedAbilities] = useState<
    (string | null)[]
  >(() => Array.from({ length: TEAM_SLOT_COUNT }, () => null));
  const [abilitySummaries, setAbilitySummaries] = useState<(string | null)[]>(
    () => Array.from({ length: TEAM_SLOT_COUNT }, () => null),
  );
  const [selectedItemIds, setSelectedItemIds] = useState<(number | null)[]>(
    () => Array.from({ length: TEAM_SLOT_COUNT }, () => null),
  );
  const [itemSearchValues, setItemSearchValues] = useState<string[]>(() =>
    Array.from({ length: TEAM_SLOT_COUNT }, () => ''),
  );
  const [selectedNatures, setSelectedNatures] = useState<(string | null)[]>(() =>
    Array.from({ length: TEAM_SLOT_COUNT }, () => null),
  );
  const [natureSearchValues, setNatureSearchValues] = useState<string[]>(() =>
    Array.from({ length: TEAM_SLOT_COUNT }, () => ''),
  );
  const [activeNatureIndex, setActiveNatureIndex] = useState<number | null>(
    null,
  );
  const [natureHighlightedIndex, setNatureHighlightedIndex] = useState(0);
  const [selectedMoveIds, setSelectedMoveIds] = useState<(number | null)[][]>(
    () =>
      Array.from({ length: TEAM_SLOT_COUNT }, () =>
        createEmptyMoveSlots<number | null>(null),
      ),
  );
  const [moveSearchValues, setMoveSearchValues] = useState<string[][]>(() =>
    Array.from({ length: TEAM_SLOT_COUNT }, () =>
      createEmptyMoveSlots<string>(''),
    ),
  );
  const [selectedEvs, setSelectedEvs] = useState<TeamPokemonEvs[]>(() =>
    Array.from({ length: TEAM_SLOT_COUNT }, () => createEmptyEvs()),
  );
  const [activeMoveSlot, setActiveMoveSlot] = useState<ActiveMoveSlot>(null);
  const [moveHighlightedIndex, setMoveHighlightedIndex] = useState(0);
  const [pokemonMovesCache, setPokemonMovesCache] = useState<
    Record<number, MoveDbEntry[]>
  >({});
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [itemHighlightedIndex, setItemHighlightedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const isClient = useIsClient();
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemonListLoading, setPokemonListLoading] = useState(true);
  const [pokemonListError, setPokemonListError] = useState<string | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const [isHydratingFromStore, setIsHydratingFromStore] = useState(true);
  const pendingItem = useItemPickStore((state) => state.pendingItem);
  const clearPendingItem = useItemPickStore((state) => state.clearPendingItem);
  const pendingPokemon = usePokemonPickStore((state) => state.pendingPokemon);
  const clearPendingPokemon = usePokemonPickStore((state) => state.clearPendingPokemon);
  const pendingMove = useMovePickStore((state) => state.pendingMove);
  const clearPendingMove = useMovePickStore((state) => state.clearPendingMove);
  const pendingNature = useNaturePickStore((state) => state.pendingNature);
  const clearPendingNature = useNaturePickStore(
    (state) => state.clearPendingNature,
  );
  const activeTeamId = usePokemonTeamStore((state) => state.activeTeamId);
  const setActiveTeamId = usePokemonTeamStore((state) => state.setActiveTeamId);
  const syncActiveTeamPokemons = usePokemonTeamStore(
    (state) => state.syncActiveTeamPokemons,
  );
  const moveFetchInFlight = useRef<Set<number>>(new Set());

  const editorSetters = useMemo(
    () => ({
      setValues,
      setSelectedPokemons,
      setSelectedAbilities,
      setAbilitySummaries,
      setSelectedItemIds,
      setItemSearchValues,
      setSelectedNatures,
      setNatureSearchValues,
      setSelectedMoveIds,
      setMoveSearchValues,
      setSelectedEvs,
    }),
    [],
  );

  const loadTeamIntoEditor = useCallback(
    (teamId: number) => {
      const { teams } = usePokemonTeamStore.getState();
      const team = teams.find((entry) => entry.teamId === teamId);
      applyEditorState(
        editorStateFromTeam(team, allPokemons),
        editorSetters,
      );
    },
    [allPokemons, editorSetters],
  );

  useEffect(() => {
    if (!isClient) return;
    let cancelled = false;
    fetchPokemonList()
      .then((list) => {
        if (!cancelled) {
          setAllPokemons(list);
          setPokemonListError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setPokemonListError(
            err instanceof Error ? err.message : '포켓몬 목록을 불러오지 못했습니다.',
          );
        }
      })
      .finally(() => {
        if (!cancelled) setPokemonListLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isClient]);

  useEffect(() => {
    if (!teamsSourceReady) {
      setEditorReady(false);
      setIsHydratingFromStore(true);
    }
  }, [teamsSourceReady]);

  useEffect(() => {
    if (!isClient || pokemonListLoading || !teamsSourceReady) return;

    const hydrateEditorFromStore = () => {
      if (!usePokemonTeamStore.persist?.hasHydrated()) return;

      setIsHydratingFromStore(true);
      const { activeTeamId: currentTeamId } = usePokemonTeamStore.getState();
      loadTeamIntoEditor(currentTeamId);
      setEditorReady(true);
    };

    hydrateEditorFromStore();
    const persist = usePokemonTeamStore.persist;
    if (!persist) return;
    return persist.onFinishHydration(hydrateEditorFromStore);
  }, [
    isClient,
    pokemonListLoading,
    teamsSourceReady,
    allPokemons,
    loadTeamIntoEditor,
    serverTeamsLoadedAt,
  ]);

  useEffect(() => {
    if (!isHydratingFromStore) return;
    setIsHydratingFromStore(false);
  }, [
    isHydratingFromStore,
    values,
    selectedPokemons,
    selectedAbilities,
    selectedItemIds,
    selectedNatures,
    selectedMoveIds,
    selectedEvs,
  ]);

  // 선택된 포켓몬별 '배울 수 있는 기술' 목록을 불러와 캐시합니다.
  useEffect(() => {
    if (!isClient) return;
    selectedPokemons.forEach((pokemon) => {
      if (!pokemon) return;
      const pokemonId = pokemon.id;
      if (pokemonMovesCache[pokemonId] || moveFetchInFlight.current.has(pokemonId)) {
        return;
      }
      moveFetchInFlight.current.add(pokemonId);

      fetch(`/api/moves?pokemonId=${pokemonId}`, { cache: 'no-store' })
        .then(async (res) => {
          const body = (await res.json()) as {
            moveIds?: number[];
            error?: string;
          };
          if (!res.ok) throw new Error(body.error ?? `조회 실패 (${res.status})`);
          setPokemonMovesCache((prev) => ({
            ...prev,
            [pokemonId]: getMovesByIds(MOVES_BY_ID, body.moveIds ?? []),
          }));
        })
        .catch(() => {
          setPokemonMovesCache((prev) => ({ ...prev, [pokemonId]: [] }));
        })
        .finally(() => {
          moveFetchInFlight.current.delete(pokemonId);
        });
    });
  }, [isClient, selectedPokemons, pokemonMovesCache]);

  /** 포켓몬 id별로 배울 수 있는 기술 id 집합 (pickable 판정용) */
  const pokemonMoveIdSets = useMemo(() => {
    const result: Record<number, Set<number>> = {};
    for (const [id, moves] of Object.entries(pokemonMovesCache)) {
      result[Number(id)] = new Set(moves.map((move) => move.id));
    }
    return result;
  }, [pokemonMovesCache]);

  const moveSuggestions: MoveDbEntry[] = useMemo(() => {
    if (!activeMoveSlot) return [];
    const pokemon = selectedPokemons[activeMoveSlot.pokemon];
    if (!pokemon) return [];
    const learnable = pokemonMovesCache[pokemon.id];
    if (!learnable) return [];

    const keyword = moveSearchValues[activeMoveSlot.pokemon]?.[activeMoveSlot.move] ?? '';
    const exclude = new Set<number>();
    selectedMoveIds[activeMoveSlot.pokemon]?.forEach((moveId, moveIndex) => {
      if (moveId != null && moveIndex !== activeMoveSlot.move) exclude.add(moveId);
    });

    return searchLearnableMoves(learnable, keyword, exclude, 50);
  }, [
    activeMoveSlot,
    selectedPokemons,
    pokemonMovesCache,
    moveSearchValues,
    selectedMoveIds,
  ]);

  const searchKeyword =
    activeIndex !== null ? values[activeIndex].trim() : '';

  const suggestions = useMemo(() => {
    if (!searchKeyword || pokemonListLoading || allPokemons.length === 0) {
      return [];
    }
    return searchPokemonByName(searchKeyword, allPokemons, 50);
  }, [searchKeyword, allPokemons, pokemonListLoading]);

  const searchLoading =
    searchKeyword.length > 0 &&
    (pokemonListLoading || allPokemons.length === 0);

  const itemSearchKeyword =
    activeItemIndex !== null ? itemSearchValues[activeItemIndex].trim() : '';

  const itemSuggestions: ItemKr[] = useMemo(() => {
    if (activeItemIndex === null) return [];
    return searchHeldItems(itemSearchKeyword, 50);
  }, [activeItemIndex, itemSearchKeyword]);

  const natureSearchKeyword =
    activeNatureIndex !== null ? natureSearchValues[activeNatureIndex].trim() : '';

  const natureSuggestions: NatureEntry[] = useMemo(() => {
    if (activeNatureIndex === null) return [];
    return searchNatures(natureSearchKeyword, 50);
  }, [activeNatureIndex, natureSearchKeyword]);

  const handleChange = useCallback((index: number, value: string) => {
    setActiveItemIndex(null);
    setActiveIndex(index);
    setHighlightedIndex(0);
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setSelectedPokemons((prev) => {
      if (!prev[index] || prev[index]?.nameKo === value) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setSelectedAbilities((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setAbilitySummaries((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setSelectedItemIds((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setItemSearchValues((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setSelectedNatures((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setNatureSearchValues((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setSelectedMoveIds((prev) => {
      if (prev[index].every((id) => id == null)) return prev;
      const next = [...prev];
      next[index] = createEmptyMoveSlots<number | null>(null);
      return next;
    });
    setMoveSearchValues((prev) => {
      if (prev[index].every((v) => v === '')) return prev;
      const next = [...prev];
      next[index] = createEmptyMoveSlots<string>('');
      return next;
    });
    setSelectedEvs((prev) => {
      if (prev[index].total === 0) return prev;
      const next = [...prev];
      next[index] = createEmptyEvs();
      return next;
    });
    setActiveMoveSlot((current) =>
      current?.pokemon === index ? null : current,
    );
  }, []);

  const handleSelectAbility = useCallback(
    (index: number, abilityName: string) => {
      const summary = getAbilitySummary(abilityName);
      setSelectedAbilities((prev) => {
        const next = [...prev];
        next[index] = abilityName;
        return next;
      });
      setAbilitySummaries((prev) => {
        const next = [...prev];
        next[index] = summary;
        return next;
      });
    },
    [],
  );

  const handleAdjustEv = useCallback(
    (pokemonIndex: number, statKey: EvStatKey, action: EvAdjustAction) => {
      setSelectedEvs((prev) => {
        const current = prev[pokemonIndex] ?? createEmptyEvs();
        const value = current[statKey];
        const usedByOthers = current.total - value;
        // 이 항목이 가질 수 있는 최대치: 항목 상한과 남은 총 포인트 중 작은 값
        const maxForStat = Math.min(EV_STAT_MAX, EV_TOTAL_MAX - usedByOthers);

        let nextValue = value;
        if (action === 'inc') nextValue = Math.min(value + 1, maxForStat);
        else if (action === 'dec') nextValue = Math.max(value - 1, 0);
        else if (action === 'max') nextValue = maxForStat;
        else if (action === 'min') nextValue = 0;

        if (nextValue === value) return prev;

        const next = [...prev];
        next[pokemonIndex] = {
          ...current,
          [statKey]: nextValue,
          total: usedByOthers + nextValue,
        };
        return next;
      });
    },
    [],
  );

  const handleSelectItem = useCallback((index: number, item: ItemKr) => {
    setSelectedItemIds((prev) => {
      const next = [...prev];
      next[index] = item.id;
      return next;
    });
    setItemSearchValues((prev) => {
      const next = [...prev];
      next[index] = item.nameKo;
      return next;
    });
    setActiveItemIndex(null);
  }, []);

  const applyPendingItemToSlot = useCallback(
    (index: number) => {
      if (!pendingItem || selectedPokemons[index] == null) return false;
      handleSelectItem(index, pendingItem);
      clearPendingItem();
      return true;
    },
    [pendingItem, selectedPokemons, handleSelectItem, clearPendingItem],
  );

  const handleItemSectionActivate = useCallback(
    (index: number) => {
      if (applyPendingItemToSlot(index)) return;
      setActiveIndex(null);
      setActiveItemIndex(index);
      setItemHighlightedIndex(0);
    },
    [applyPendingItemToSlot],
  );

  const handleItemSearchChange = useCallback((index: number, value: string) => {
    setActiveIndex(null);
    setActiveItemIndex(index);
    setItemHighlightedIndex(0);
    setItemSearchValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setSelectedItemIds((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  const handleClearItem = useCallback((index: number) => {
    setSelectedItemIds((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setItemSearchValues((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setActiveItemIndex((current) => (current === index ? null : current));
  }, []);

  const handleSelectNature = useCallback((index: number, nature: string) => {
    setSelectedNatures((prev) => {
      const next = [...prev];
      next[index] = nature;
      return next;
    });
    setNatureSearchValues((prev) => {
      const next = [...prev];
      next[index] = nature;
      return next;
    });
    setActiveNatureIndex(null);
  }, []);

  const applyPendingNatureToSlot = useCallback(
    (index: number) => {
      if (!pendingNature || selectedPokemons[index] == null) return false;
      handleSelectNature(index, pendingNature);
      clearPendingNature();
      return true;
    },
    [pendingNature, selectedPokemons, handleSelectNature, clearPendingNature],
  );

  const handleNatureSectionActivate = useCallback(
    (index: number) => {
      if (applyPendingNatureToSlot(index)) return;
      setActiveIndex(null);
      setActiveItemIndex(null);
      setActiveNatureIndex(index);
      setNatureHighlightedIndex(0);
    },
    [applyPendingNatureToSlot],
  );

  const handleNatureSearchChange = useCallback(
    (index: number, value: string) => {
      setActiveIndex(null);
      setActiveItemIndex(null);
      setActiveNatureIndex(index);
      setNatureHighlightedIndex(0);
      setNatureSearchValues((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
      setSelectedNatures((prev) => {
        // 입력값이 정확히 유효한 성격이면 곧바로 확정, 아니면 해제
        const matched = isValidNature(value) ? value : null;
        if (prev[index] === matched) return prev;
        const next = [...prev];
        next[index] = matched;
        return next;
      });
    },
    [],
  );

  const handleClearNature = useCallback((index: number) => {
    setSelectedNatures((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setNatureSearchValues((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setActiveNatureIndex((current) => (current === index ? null : current));
  }, []);

  const handleNatureKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const dropdownOpen =
        activeNatureIndex === index &&
        selectedPokemons[index] != null &&
        natureSuggestions.length > 0;

      if (!dropdownOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setNatureHighlightedIndex(
          (prev) => (prev + 1) % natureSuggestions.length,
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setNatureHighlightedIndex(
          (prev) =>
            (prev - 1 + natureSuggestions.length) % natureSuggestions.length,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const picked = natureSuggestions[natureHighlightedIndex];
        if (picked) handleSelectNature(index, picked.name);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setActiveNatureIndex(null);
      }
    },
    [
      activeNatureIndex,
      selectedPokemons,
      natureSuggestions,
      natureHighlightedIndex,
      handleSelectNature,
    ],
  );

  const handleSelectMove = useCallback(
    (pokemonIndex: number, moveIndex: number, move: MoveDbEntry) => {
      setSelectedMoveIds((prev) => {
        // 이미 다른 슬롯에 배운 기술이면 추가하지 않습니다.
        if (
          prev[pokemonIndex].some(
            (id, i) => i !== moveIndex && id === move.id,
          )
        ) {
          return prev;
        }
        const next = prev.map((slots) => [...slots]);
        next[pokemonIndex][moveIndex] = move.id;
        return next;
      });
      setMoveSearchValues((prev) => {
        const next = prev.map((slots) => [...slots]);
        next[pokemonIndex][moveIndex] = move.koreanName;
        return next;
      });
      setActiveMoveSlot(null);
    },
    [],
  );

  const applyPendingMoveToSlot = useCallback(
    (pokemonIndex: number, moveIndex: number) => {
      const pokemon = selectedPokemons[pokemonIndex];
      if (!pendingMove || !pokemon) return false;
      const learnable = pokemonMoveIdSets[pokemon.id];
      if (!learnable?.has(pendingMove.id)) return false;
      // 이미 배운(적용된) 기술은 다시 배울 수 없습니다.
      if (selectedMoveIds[pokemonIndex].includes(pendingMove.id)) return false;

      handleSelectMove(pokemonIndex, moveIndex, pendingMove);
      clearPendingMove();
      return true;
    },
    [
      pendingMove,
      selectedPokemons,
      pokemonMoveIdSets,
      selectedMoveIds,
      handleSelectMove,
      clearPendingMove,
    ],
  );

  const handleMoveSlotActivate = useCallback(
    (pokemonIndex: number, moveIndex: number) => {
      if (applyPendingMoveToSlot(pokemonIndex, moveIndex)) return;
      setActiveIndex(null);
      setActiveItemIndex(null);
      setActiveMoveSlot({ pokemon: pokemonIndex, move: moveIndex });
      setMoveHighlightedIndex(0);
    },
    [applyPendingMoveToSlot],
  );

  const handleMoveSearchChange = useCallback(
    (pokemonIndex: number, moveIndex: number, value: string) => {
      setActiveIndex(null);
      setActiveItemIndex(null);
      setActiveMoveSlot({ pokemon: pokemonIndex, move: moveIndex });
      setMoveHighlightedIndex(0);
      setMoveSearchValues((prev) => {
        const next = prev.map((slots) => [...slots]);
        next[pokemonIndex][moveIndex] = value;
        return next;
      });
      setSelectedMoveIds((prev) => {
        if (prev[pokemonIndex][moveIndex] == null) return prev;
        const next = prev.map((slots) => [...slots]);
        next[pokemonIndex][moveIndex] = null;
        return next;
      });
    },
    [],
  );

  const handleClearMove = useCallback(
    (pokemonIndex: number, moveIndex: number) => {
      setSelectedMoveIds((prev) => {
        const next = prev.map((slots) => [...slots]);
        next[pokemonIndex][moveIndex] = null;
        return next;
      });
      setMoveSearchValues((prev) => {
        const next = prev.map((slots) => [...slots]);
        next[pokemonIndex][moveIndex] = '';
        return next;
      });
      setActiveMoveSlot((current) =>
        current?.pokemon === pokemonIndex && current.move === moveIndex
          ? null
          : current,
      );
    },
    [],
  );

  const handleMoveKeyDown = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      pokemonIndex: number,
      moveIndex: number,
    ) => {
      const dropdownOpen =
        activeMoveSlot?.pokemon === pokemonIndex &&
        activeMoveSlot.move === moveIndex &&
        moveSuggestions.length > 0;

      if (!dropdownOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setMoveHighlightedIndex((prev) => (prev + 1) % moveSuggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setMoveHighlightedIndex(
          (prev) => (prev - 1 + moveSuggestions.length) % moveSuggestions.length,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const picked = moveSuggestions[moveHighlightedIndex];
        if (picked) handleSelectMove(pokemonIndex, moveIndex, picked);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setActiveMoveSlot(null);
      }
    },
    [activeMoveSlot, moveSuggestions, moveHighlightedIndex, handleSelectMove],
  );

  const handleSelect = useCallback((index: number, suggestion: Pokemon) => {
    const pokemon = normalizePokemon(
      suggestion as unknown as Record<string, unknown>,
    );
    const defaultAbility = getDefaultAbility(pokemon);

    setValues((prev) => {
      const next = [...prev];
      next[index] = pokemon.nameKo;
      return next;
    });
    setSelectedPokemons((prev) => {
      const next = [...prev];
      next[index] = pokemon;
      return next;
    });
    setSelectedAbilities((prev) => {
      const next = [...prev];
      next[index] = defaultAbility;
      return next;
    });
    setAbilitySummaries((prev) => {
      const next = [...prev];
      next[index] = getAbilitySummary(defaultAbility);
      return next;
    });
    setSelectedItemIds((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setItemSearchValues((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setSelectedNatures((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setNatureSearchValues((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setSelectedMoveIds((prev) => {
      const next = [...prev];
      next[index] = createEmptyMoveSlots<number | null>(null);
      return next;
    });
    setMoveSearchValues((prev) => {
      const next = [...prev];
      next[index] = createEmptyMoveSlots<string>('');
      return next;
    });
    setSelectedEvs((prev) => {
      const next = [...prev];
      next[index] = createEmptyEvs();
      return next;
    });
    setActiveIndex(null);
  }, []);

  const applyPendingPokemonToSlot = useCallback(
    (index: number) => {
      if (!pendingPokemon) return false;
      handleSelect(index, pendingPokemon);
      clearPendingPokemon();
      return true;
    },
    [pendingPokemon, handleSelect, clearPendingPokemon],
  );

  const handleThumbnailActivate = useCallback(
    (index: number) => {
      applyPendingPokemonToSlot(index);
    },
    [applyPendingPokemonToSlot],
  );

  const switchActiveTeam = useCallback(
    (teamId: number) => {
      if (teamId === activeTeamId) return;
      if (teamId < 1 || teamId > MAX_TEAMS) return;

      if (editorReady) {
        const existing =
          usePokemonTeamStore.getState().getActiveTeam()?.pokemons ?? [];
        const pokemons = buildPokemonsFromEditor(
          selectedPokemons,
          selectedAbilities,
          selectedItemIds,
          existing,
          selectedMoveIds,
          selectedNatures,
          selectedEvs,
        );
        syncActiveTeamPokemons(pokemons);
      }

      setActiveTeamId(teamId);
      loadTeamIntoEditor(teamId);
      setActiveIndex(null);
      setActiveItemIndex(null);
      setActiveNatureIndex(null);
      setActiveMoveSlot(null);
    },
    [
      activeTeamId,
      editorReady,
      selectedPokemons,
      selectedAbilities,
      selectedItemIds,
      selectedMoveIds,
      selectedNatures,
      selectedEvs,
      syncActiveTeamPokemons,
      setActiveTeamId,
      loadTeamIntoEditor,
    ],
  );

  const handleClear = useCallback((index: number) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setSelectedPokemons((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setSelectedAbilities((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setAbilitySummaries((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setSelectedItemIds((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setItemSearchValues((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setSelectedNatures((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setNatureSearchValues((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setSelectedMoveIds((prev) => {
      const next = [...prev];
      next[index] = createEmptyMoveSlots<number | null>(null);
      return next;
    });
    setMoveSearchValues((prev) => {
      const next = [...prev];
      next[index] = createEmptyMoveSlots<string>('');
      return next;
    });
    setSelectedEvs((prev) => {
      const next = [...prev];
      next[index] = createEmptyEvs();
      return next;
    });
    setActiveIndex((current) => (current === index ? null : current));
    setActiveNatureIndex((current) => (current === index ? null : current));
    setActiveMoveSlot((current) =>
      current?.pokemon === index ? null : current,
    );
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const dropdownOpen =
        activeIndex === index &&
        values[index].trim().length > 0 &&
        !searchLoading &&
        suggestions.length > 0;

      if (!dropdownOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const picked = suggestions[highlightedIndex];
        if (picked) handleSelect(index, picked);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setActiveIndex(null);
      }
    },
    [
      activeIndex,
      values,
      searchLoading,
      suggestions,
      highlightedIndex,
      handleSelect,
    ],
  );

  const handleItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const dropdownOpen =
        activeItemIndex === index &&
        selectedPokemons[index] != null &&
        itemSuggestions.length > 0;

      if (!dropdownOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setItemHighlightedIndex((prev) => (prev + 1) % itemSuggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setItemHighlightedIndex(
          (prev) => (prev - 1 + itemSuggestions.length) % itemSuggestions.length,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const picked = itemSuggestions[itemHighlightedIndex];
        if (picked) handleSelectItem(index, picked);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setActiveItemIndex(null);
      }
    },
    [
      activeItemIndex,
      selectedPokemons,
      itemSuggestions,
      itemHighlightedIndex,
      handleSelectItem,
    ],
  );

  const teamProps: TeamProps = {
    editorReady,
    isHydratingFromStore,
    values,
    selectedPokemons,
    selectedAbilities,
    abilitySummaries,
    selectedItemIds,
    itemSearchValues,
    activeItemIndex,
    itemSuggestions,
    itemHighlightedIndex,
    activeIndex,
    isClient,
    searchLoading,
    suggestions,
    highlightedIndex,
    onActiveIndexChange: setActiveIndex,
    onHighlightedIndexChange: setHighlightedIndex,
    onChange: handleChange,
    onClear: handleClear,
    onKeyDown: handleKeyDown,
    onSelect: handleSelect,
    onSelectAbility: handleSelectAbility,
    onItemSearchChange: handleItemSearchChange,
    onSelectItem: handleSelectItem,
    onClearItem: handleClearItem,
    onActiveItemIndexChange: setActiveItemIndex,
    onItemHighlightedIndexChange: setItemHighlightedIndex,
    onItemKeyDown: handleItemKeyDown,
    pendingItemPick: pendingItem,
    pendingPokemonPick: pendingPokemon,
    onItemSectionActivate: handleItemSectionActivate,
    onThumbnailActivate: handleThumbnailActivate,
    selectedNatures,
    natureSearchValues,
    activeNatureIndex,
    natureSuggestions,
    natureHighlightedIndex,
    pendingNaturePick: pendingNature,
    onNatureSearchChange: handleNatureSearchChange,
    onSelectNature: handleSelectNature,
    onClearNature: handleClearNature,
    onActiveNatureIndexChange: setActiveNatureIndex,
    onNatureHighlightedIndexChange: setNatureHighlightedIndex,
    onNatureSectionActivate: handleNatureSectionActivate,
    onNatureKeyDown: handleNatureKeyDown,
    selectedMoveIds,
    moveSearchValues,
    activeMoveSlot,
    moveSuggestions,
    moveHighlightedIndex,
    pokemonMoveIdSets,
    pendingMovePick: pendingMove,
    onMoveSearchChange: handleMoveSearchChange,
    onSelectMove: handleSelectMove,
    onClearMove: handleClearMove,
    onMoveSlotActivate: handleMoveSlotActivate,
    onActiveMoveSlotChange: setActiveMoveSlot,
    onMoveHighlightedIndexChange: setMoveHighlightedIndex,
    onMoveKeyDown: handleMoveKeyDown,
    selectedEvs,
    onAdjustEv: handleAdjustEv,
  };

  return {
    teamProps,
    pokemonListError,
    selectedPokemons,
    allPokemons,
    handleSelect,
    switchActiveTeam,
    activeTeamId,
  };
}
