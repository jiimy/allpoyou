'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
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
import { getAbilityNameById } from '@/store/pokemonTeamMappers';
import { TEAM_SLOT_COUNT, usePokemonTeamStore } from '@/store/PokemonTeamStore';
import { getItemNameKoById, searchHeldItems } from '@/utils/itemSearch';
import { normalizePokemon } from '@/utils/pokemonNormalize';
import type { ItemKr } from '@/types/item';

const subscribeNoop = () => () => {};

function useIsClient() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

export function useTeamEditor() {
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
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [itemHighlightedIndex, setItemHighlightedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const isClient = useIsClient();
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemonListLoading, setPokemonListLoading] = useState(true);
  const [pokemonListError, setPokemonListError] = useState<string | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const editorHydratedRef = useRef(false);

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
    if (!isClient || pokemonListLoading || editorHydratedRef.current) return;

    const hydrateEditorFromStore = () => {
      if (editorHydratedRef.current) return;
      if (!usePokemonTeamStore.persist.hasHydrated()) return;

      const { teams, activeTeamId } = usePokemonTeamStore.getState();
      const activeTeam = teams.find((t) => t.teamId === activeTeamId);

      if (!activeTeam || allPokemons.length === 0) {
        editorHydratedRef.current = true;
        setEditorReady(true);
        return;
      }

      const nextValues = Array.from({ length: TEAM_SLOT_COUNT }, () => '');
      const nextSelected: (Pokemon | null)[] = Array.from(
        { length: TEAM_SLOT_COUNT },
        () => null,
      );
      const nextAbilities: (string | null)[] = Array.from(
        { length: TEAM_SLOT_COUNT },
        () => null,
      );
      const nextSummaries: (string | null)[] = Array.from(
        { length: TEAM_SLOT_COUNT },
        () => null,
      );
      const nextItemIds: (number | null)[] = Array.from(
        { length: TEAM_SLOT_COUNT },
        () => null,
      );
      const nextItemSearchValues = Array.from(
        { length: TEAM_SLOT_COUNT },
        () => '',
      );

      activeTeam.pokemons.forEach((slot, index) => {
        if (!slot?.pokemonId) return;
        const pokemon = allPokemons.find((p) => p.id === slot.pokemonId);
        if (!pokemon) return;

        const abilityName =
          getAbilityNameById(slot.abilityId) ?? getDefaultAbility(pokemon);
        const itemName = getItemNameKoById(slot.itemId);

        nextValues[index] = pokemon.nameKo;
        nextSelected[index] = pokemon;
        nextAbilities[index] = abilityName;
        nextSummaries[index] = getAbilitySummary(abilityName);
        nextItemIds[index] = slot.itemId ?? null;
        nextItemSearchValues[index] = itemName ?? '';
      });

      setValues(nextValues);
      setSelectedPokemons(nextSelected);
      setSelectedAbilities(nextAbilities);
      setAbilitySummaries(nextSummaries);
      setSelectedItemIds(nextItemIds);
      setItemSearchValues(nextItemSearchValues);
      editorHydratedRef.current = true;
      setEditorReady(true);
    };

    hydrateEditorFromStore();
    return usePokemonTeamStore.persist.onFinishHydration(hydrateEditorFromStore);
  }, [isClient, pokemonListLoading, allPokemons]);

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
    setActiveIndex(null);
  }, []);

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
    setActiveIndex((current) => (current === index ? null : current));
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
  };

  return {
    teamProps,
    pokemonListError,
    selectedPokemons,
    allPokemons,
    handleSelect,
  };
}
