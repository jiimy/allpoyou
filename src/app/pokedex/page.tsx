'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import StickySearchBar from '@/components/searchBar/StickySearchBar';
import PokedexList from '@/components/pokedexList/PokedexList';
import PokedexTagFilter from '@/components/pokedexTagFilter/PokedexTagFilter';
import PokedexStatSort, {
  type PokedexStatSortKey,
  type PokedexStatSortRule,
  type PokedexTypeSlotSort,
} from '@/components/pokedexStatSort/PokedexStatSort';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';
import {
  cyclePokedexTagSelection,
  parsePokedexTagSelections,
  serializePokedexTagSelections,
} from '@/store/PokemonStore';

import s from './pokedexPage.module.scss';
import Loading from '@/components/loading/Loading';

function getTypeSearchTokens(keyword: string): string[] | null {
  const tokens = keyword.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;
  if (!tokens.every((token) => token in TYPE_COLOR)) return null;
  return tokens;
}

function PokedexPageContent() {
  const { searchParams, replaceParams } = useUrlQueryParams();
  const keyword = searchParams.get('q') ?? '';
  const tagSelections = useMemo(
    () =>
      parsePokedexTagSelections(
        searchParams.get('tags'),
        searchParams.get('tag'),
      ),
    [searchParams],
  );
  const [isSearchDebouncing, setIsSearchDebouncing] = useState(false);
  const [statSorts, setStatSorts] = useState<PokedexStatSortRule[]>([]);
  const [typeSlotSort, setTypeSlotSort] = useState<PokedexTypeSlotSort | null>(
    null,
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  const typeSearchTokens = useMemo(
    () => getTypeSearchTokens(keyword),
    [keyword],
  );
  const typeSlotEnabled = typeSearchTokens != null;

  useEffect(() => {
    if (!typeSlotEnabled && typeSlotSort != null) {
      setTypeSlotSort(null);
    }
  }, [typeSlotEnabled, typeSlotSort]);

  useEffect(() => {
    setSelectedTypes((prev) => {
      const next = prev.filter((type) => availableTypes.includes(type));
      return next.length === prev.length ? prev : next;
    });
  }, [availableTypes]);

  const handleAvailableTypesChange = useCallback((types: string[]) => {
    setAvailableTypes((prev) => {
      if (
        prev.length === types.length &&
        prev.every((type, index) => type === types[index])
      ) {
        return prev;
      }
      return types;
    });
  }, []);

  const handleKeywordChange = (value: string) => {
    replaceParams({
      q: value.trim() || null,
      pokemonId: null,
    });
  };

  const commitTagSelections = useCallback(
    (next: typeof tagSelections) => {
      replaceParams({
        tags: serializePokedexTagSelections(next),
        tag: null,
        pokemonId: null,
      });
    },
    [replaceParams],
  );

  const handleCycleTag = useCallback(
    (tag: string) => {
      commitTagSelections(cyclePokedexTagSelection(tagSelections, tag));
    },
    [commitTagSelections, tagSelections],
  );

  const handleClearTags = useCallback(() => {
    commitTagSelections([]);
  }, [commitTagSelections]);

  const handleStatSortClick = useCallback((key: PokedexStatSortKey) => {
    setStatSorts((prev) => {
      const index = prev.findIndex((rule) => rule.key === key);
      if (index >= 0) {
        return prev.filter((_, i) => i !== index);
      }
      return [...prev, { key, direction: 'desc' }];
    });
  }, []);

  const handleStatSortDirectionClick = useCallback((key: PokedexStatSortKey) => {
    setStatSorts((prev) =>
      prev.map((rule) =>
        rule.key === key
          ? {
              ...rule,
              direction: rule.direction === 'asc' ? 'desc' : 'asc',
            }
          : rule,
      ),
    );
  }, []);

  const handleSortReset = useCallback(() => {
    setStatSorts([]);
  }, []);

  const handleTypeSlotSortChange = useCallback((slot: PokedexTypeSlotSort) => {
    setTypeSlotSort(slot);
  }, []);

  const handleTypeSlotReset = useCallback(() => {
    setTypeSlotSort(null);
  }, []);

  const handleTypeToggle = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((entry) => entry !== type)
        : [...prev, type],
    );
  }, []);

  const handleTypeFilterReset = useCallback(() => {
    setSelectedTypes([]);
  }, []);

  return (
    <div className={s.page}>
      <StickySearchBar
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        onDebouncingChange={setIsSearchDebouncing}
        placeholderType="pokemon"
      />
      <PokedexTagFilter
        selections={tagSelections}
        onCycleTag={handleCycleTag}
        onClear={handleClearTags}
      />
      <PokedexStatSort
        statSorts={statSorts}
        onSortClick={handleStatSortClick}
        onSortDirectionClick={handleStatSortDirectionClick}
        onReset={handleSortReset}
        typeSlotSort={typeSlotSort}
        onTypeSlotSortChange={handleTypeSlotSortChange}
        onTypeSlotReset={handleTypeSlotReset}
        typeSlotEnabled={typeSlotEnabled}
        availableTypes={availableTypes}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        onTypeFilterReset={handleTypeFilterReset}
      />
      <div className={s.listArea}>
        {isSearchDebouncing ? (
          <Loading />
        ) : (
          <PokedexList
            keyword={keyword}
            tagSelections={tagSelections}
            statSorts={statSorts}
            typeSlotSort={typeSlotSort}
            typeSearchTokens={typeSearchTokens}
            selectedTypes={selectedTypes}
            onAvailableTypesChange={handleAvailableTypesChange}
          />
        )}
      </div>
    </div>
  );
}

const PokedexPage = () => {
  return (
    <Suspense fallback={null}>
      <PokedexPageContent />
    </Suspense>
  );
};

export default PokedexPage;
