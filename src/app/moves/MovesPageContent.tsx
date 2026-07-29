'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { POCHAMS_POKEMON_DATA } from '@/components/pochamsData/PochamsPokemonData';
import StickySearchBar from '@/components/searchBar/StickySearchBar';
import type { MoveDamageClassFilter } from '@/constants/moveFilters';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';
import type { MoveDbEntry } from '@/types/move';
import { buildMovesIndex, getMovesByIds } from '@/utils/movesDb';
import {
  filterMovesByPochampsNames,
  resolvePokemonFromPochampsLearner,
  resolvePochampsStorageSlug,
  toChampionsMoveLookupKey,
  toPokemonMetaSlug,
} from '@/utils/pochampsMoves';
import { fetchPokemonList } from '@/store/PokemonStore';
import { useMovePickStore } from '@/store/MovePickStore';
import { usePochampsStore } from '@/store/PochampsStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import movesData from '../../../public/data/moves-db.json';

import MoveList from './MoveList';

const { all: allMoves, byId: movesById } = buildMovesIndex(
  movesData as unknown as Record<string, MoveDbEntry>,
);

type PokemonSearchState = {
  query: string;
  moveIds: number[];
  pokemonNames: string[];
  loading: boolean;
  error: string | null;
};

export type PokemonLearner = {
  id: number;
  number: number;
  nameKo: string;
  /** Storage Pokemon/{slug} 경로용 (폼/지역폼 매칭용) */
  metaSlug?: string;
};

type LearnableCacheEntry = {
  pokemon: PokemonLearner[];
  error: string | null;
};

type PokemonMovesCacheEntry = {
  moves: MoveDbEntry[];
  error: string | null;
};

function parseMoveIdParam(raw: string | null): number | null {
  if (!raw) return null;
  const id = Number.parseInt(raw, 10);
  return Number.isFinite(id) ? id : null;
}

function getKeywordFromParams(searchParams: URLSearchParams): string {
  const moveId = parseMoveIdParam(searchParams.get('moveId'));
  const move =
    moveId != null ? (movesById.get(moveId) ?? null) : null;
  return move?.koreanName ?? searchParams.get('q')?.trim() ?? '';
}

function getShowLearnableFromParams(searchParams: URLSearchParams): boolean {
  return searchParams.get('learnable') === '1';
}

function hasSearchParams(searchParams: URLSearchParams): boolean {
  return (
    Boolean(searchParams.get('q')?.trim()) ||
    searchParams.get('moveId') != null
  );
}

export default function MovesPageContent() {
  const searchParams = useSearchParams();
  const { replaceParams, pushParams } = useUrlQueryParams();
  const keyword = getKeywordFromParams(searchParams);
  const showLearnablePokemon = getShowLearnableFromParams(searchParams);
  const [activeType, setActiveType] = useState<string | 'all'>('all');
  const [activeDamageClass, setActiveDamageClass] =
    useState<MoveDamageClassFilter>('all');
  const [pokemonSearch, setPokemonSearch] = useState<PokemonSearchState | null>(
    null,
  );
  const [learnableCache, setLearnableCache] = useState<
    Record<string, LearnableCacheEntry>
  >({});
  const [learnableLoadingKey, setLearnableLoadingKey] = useState<string | null>(
    null,
  );
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonLearner | null>(
    null,
  );
  const [pokemonMovesCache, setPokemonMovesCache] = useState<
    Record<number, PokemonMovesCacheEntry>
  >({});
  const [pokemonMovesLoadingId, setPokemonMovesLoadingId] = useState<
    number | null
  >(null);
  const setPendingMove = useMovePickStore((state) => state.setPendingMove);
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);
  const pochampsEnabled = usePochampsStore((state) => state.enabled);
  const pochampsHydrated = usePochampsStore((state) => state.hasHydrated);
  const pochampsActive = pochampsHydrated && pochampsEnabled;
  const [pochampsMoveNames, setPochampsMoveNames] = useState<string[] | null>(
    null,
  );
  const [pochampsMovesError, setPochampsMovesError] = useState<string | null>(
    null,
  );
  const [pochampsFetchKey, setPochampsFetchKey] = useState(false);
  if (pochampsFetchKey !== pochampsActive) {
    setPochampsFetchKey(pochampsActive);
    setPochampsMoveNames(null);
    setPochampsMovesError(null);
    setLearnableCache({});
    setLearnableLoadingKey(null);
    setPokemonMovesCache({});
    setPokemonMovesLoadingId(null);
    setSelectedPokemon(null);
  }

  useEffect(() => {
    if (!pochampsActive) return;

    let cancelled = false;

    fetch('/api/pokemon-meta/moves', { cache: 'no-store' })
      .then(async (res) => {
        const body = (await res.json()) as {
          names?: string[];
          error?: string;
        };
        if (!res.ok) {
          throw new Error(body.error ?? `조회 실패 (${res.status})`);
        }
        if (!cancelled) {
          setPochampsMoveNames(body.names ?? []);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setPochampsMoveNames([]);
          setPochampsMovesError(
            err instanceof Error
              ? err.message
              : '포챔스 기술 목록을 불러오지 못했습니다.',
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pochampsActive]);

  const pochampsMovesLoading =
    pochampsActive && pochampsMoveNames == null && !pochampsMovesError;

  const pochampsMoves = useMemo(() => {
    if (!pochampsActive || pochampsMoveNames == null) return null;
    return filterMovesByPochampsNames(allMoves, pochampsMoveNames);
  }, [pochampsActive, pochampsMoveNames]);

  const catalogMoves = useMemo(
    () => (pochampsActive ? (pochampsMoves ?? []) : allMoves),
    [pochampsActive, pochampsMoves],
  );

  const handleMoveClick = useCallback(
    (move: MoveDbEntry) => {
      setPendingMove(move);
      setTeamModalOpen(true);
    },
    [setPendingMove, setTeamModalOpen],
  );

  const handleMoveSearch = useCallback(
    (move: MoveDbEntry) => {
      const name = move.koreanName;
      const currentQ = searchParams.get('q')?.trim() ?? '';
      const currentMoveId = searchParams.get('moveId');

      if (currentQ === name && currentMoveId === String(move.id)) {
        return;
      }

      setSelectedPokemon(null);
      pushParams({
        q: name,
        moveId: String(move.id),
        learnable: '1',
      });
    },
    [pushParams, searchParams],
  );

  const moveIdsByNameMatch = useMemo(() => {
    const q = keyword.trim();
    if (!q) return [];

    const ids: number[] = [];
    const activeMoveId = parseMoveIdParam(searchParams.get('moveId'));
    if (activeMoveId != null) {
      const activeMove = movesById.get(activeMoveId);
      if (activeMove && activeMove.koreanName === q) {
        ids.push(activeMoveId);
      }
    }

    // 포챔스 인덱스가 stale여도 기술명 검색이 되도록 allMoves에서도 매칭
    const pool = pochampsActive ? allMoves : catalogMoves;
    for (const move of pool) {
      if (move.koreanName.includes(q)) {
        ids.push(move.id);
      }
    }
    return [...new Set(ids)].sort((a, b) => a - b);
  }, [keyword, catalogMoves, pochampsActive, searchParams]);

  const moveIdsKey = moveIdsByNameMatch.join(',');

  const handleKeywordChange = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      const updates = {
        q: trimmed || null,
        moveId: null,
        learnable: null,
      };

      setSelectedPokemon(null);

      if (!trimmed) {
        replaceParams(updates);
        return;
      }

      if (!hasSearchParams(searchParams)) {
        pushParams(updates);
      } else {
        replaceParams(updates);
      }
    },
    [pushParams, replaceParams, searchParams],
  );

  const handleShowLearnablePokemonChange = useCallback(
    (checked: boolean) => {
      setSelectedPokemon(null);
      replaceParams({ learnable: checked ? '1' : null });
    },
    [replaceParams],
  );

  const handleSelectPokemon = useCallback(
    (pokemon: PokemonLearner) => {
      if (selectedPokemon?.id === pokemon.id) {
        setSelectedPokemon(null);
        setPokemonMovesLoadingId(null);
        return;
      }
      setSelectedPokemon(pokemon);
      setPokemonMovesLoadingId(
        pokemonMovesCache[pokemon.id] ? null : pokemon.id,
      );
    },
    [selectedPokemon, pokemonMovesCache],
  );

  useEffect(() => {
    setSelectedPokemon(null);
    setPokemonMovesLoadingId(null);
  }, [keyword]);

  useEffect(() => {
    if (keyword.trim()) return;

    setPokemonSearch(null);
    setPokemonMovesCache({});
    setPokemonMovesLoadingId(null);
    setLearnableCache({});
    setLearnableLoadingKey(null);
  }, [keyword]);

  useEffect(() => {
    const q = keyword.trim();
    if (!q) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      setPokemonSearch((prev) => ({
        query: q,
        moveIds: prev?.query === q ? prev.moveIds : [],
        pokemonNames: prev?.query === q ? prev.pokemonNames : [],
        loading: true,
        error: null,
      }));

      const run = async () => {
        try {
          if (pochampsActive) {
            const list = await fetchPokemonList();
            const lower = q.toLowerCase();

            type PochampsSearchTarget = {
              nameKo: string;
              slug: string;
            };

            const matched: PochampsSearchTarget[] = [];
            const seenSlug = new Set<string>();

            for (const displayName of POCHAMS_POKEMON_DATA) {
              const slug = toPokemonMetaSlug(displayName);
              const pokemon = resolvePokemonFromPochampsLearner(
                { pokemonName: displayName, pokemonSlug: slug },
                list,
              );
              const nameKo = pokemon?.nameKo ?? displayName;
              const nameEn = pokemon?.name ?? displayName;
              const hit =
                nameKo === q ||
                nameEn.toLowerCase() === lower ||
                displayName.toLowerCase() === lower ||
                nameKo.includes(q) ||
                nameEn.toLowerCase().includes(lower) ||
                displayName.toLowerCase().includes(lower);

              if (!hit || seenSlug.has(slug)) continue;
              seenSlug.add(slug);
              matched.push({ nameKo, slug });
            }

            const exact = matched.filter(
              (t) =>
                t.nameKo === q ||
                t.slug === resolvePochampsStorageSlug(q) ||
                t.slug === toPokemonMetaSlug(q),
            );
            const targets = (exact.length > 0 ? exact : matched).slice(0, 8);

            if (targets.length === 0) {
              if (cancelled) return;
              setPokemonSearch({
                query: q,
                moveIds: [],
                pokemonNames: [],
                loading: false,
                error: null,
              });
              return;
            }

            const moveIds = new Set<number>();
            const pokemonNames: string[] = [];

            for (const target of targets) {
              const res = await fetch(
                `/api/pokemon-meta/pokemon-moves?slug=${encodeURIComponent(target.slug)}`,
                { cache: 'no-store' },
              );
              const body = (await res.json()) as {
                names?: string[];
                error?: string;
              };
              if (!res.ok) continue;
              const moves = filterMovesByPochampsNames(
                allMoves,
                body.names ?? [],
              );
              if (moves.length === 0) continue;
              pokemonNames.push(target.nameKo);
              for (const move of moves) moveIds.add(move.id);
            }

            if (cancelled) return;
            setPokemonSearch({
              query: q,
              moveIds: [...moveIds],
              pokemonNames,
              loading: false,
              error: null,
            });
            return;
          }

          const res = await fetch(
            `/api/moves?pokemonName=${encodeURIComponent(q)}`,
            { cache: 'no-store' },
          );
          const body = (await res.json()) as {
            moveIds?: number[];
            pokemonNames?: string[];
            error?: string;
          };
          if (!res.ok) {
            throw new Error(body.error ?? `조회 실패 (${res.status})`);
          }
          if (cancelled) return;
          setPokemonSearch({
            query: q,
            moveIds: body.moveIds ?? [],
            pokemonNames: body.pokemonNames ?? [],
            loading: false,
            error: null,
          });
        } catch (err: unknown) {
          if (cancelled) return;
          setPokemonSearch({
            query: q,
            moveIds: [],
            pokemonNames: [],
            loading: false,
            error:
              err instanceof Error
                ? err.message
                : '포켓몬 기술 조회에 실패했습니다.',
          });
        }
      };

      void run();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [keyword, pochampsActive]);

  useEffect(() => {
    if (moveIdsByNameMatch.length === 0) return;
    if (learnableCache[moveIdsKey]) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      setLearnableLoadingKey(moveIdsKey);

      const run = async () => {
        try {
          if (pochampsActive) {
            const keys = moveIdsByNameMatch
              .map((id) => movesById.get(id))
              .filter((move): move is MoveDbEntry => move != null)
              .flatMap((move) => [
                toChampionsMoveLookupKey(move.englishName),
                toChampionsMoveLookupKey(move.koreanName),
              ])
              .filter(Boolean);

            const res = await fetch(
              `/api/pokemon-meta/moves/learners?keys=${encodeURIComponent(keys.join(','))}`,
              { cache: 'no-store' },
            );
            const body = (await res.json()) as {
              learners?: Array<{ pokemonName: string; pokemonSlug: string }>;
              error?: string;
            };
            if (!res.ok) {
              throw new Error(body.error ?? `조회 실패 (${res.status})`);
            }

            const list = await fetchPokemonList();
            const pokemon: PokemonLearner[] = [];
            const seen = new Set<number>();
            for (const learner of body.learners ?? []) {
              const matched = resolvePokemonFromPochampsLearner(learner, list);
              if (!matched || seen.has(matched.id)) continue;
              seen.add(matched.id);
              pokemon.push({
                id: matched.id,
                number: matched.number,
                nameKo: matched.nameKo,
                metaSlug: learner.pokemonSlug,
              });
            }
            pokemon.sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));

            if (cancelled) return;
            setLearnableCache((prev) => ({
              ...prev,
              [moveIdsKey]: { pokemon, error: null },
            }));
            setLearnableLoadingKey((key) => (key === moveIdsKey ? null : key));
            return;
          }

          const res = await fetch(
            `/api/moves?moveIds=${encodeURIComponent(moveIdsKey)}`,
            { cache: 'no-store' },
          );
          const body = (await res.json()) as {
            pokemon?: PokemonLearner[];
            error?: string;
          };
          if (!res.ok) {
            throw new Error(body.error ?? `조회 실패 (${res.status})`);
          }
          if (cancelled) return;
          setLearnableCache((prev) => ({
            ...prev,
            [moveIdsKey]: {
              pokemon: body.pokemon ?? [],
              error: null,
            },
          }));
          setLearnableLoadingKey((key) => (key === moveIdsKey ? null : key));
        } catch (err: unknown) {
          if (cancelled) return;
          const message =
            err instanceof Error
              ? err.message
              : '배울 수 있는 포켓몬 조회에 실패했습니다.';
          setLearnableCache((prev) => ({
            ...prev,
            [moveIdsKey]: { pokemon: [], error: message },
          }));
          setLearnableLoadingKey((key) => (key === moveIdsKey ? null : key));
        }
      };

      void run();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    moveIdsKey,
    moveIdsByNameMatch,
    learnableCache,
    pochampsActive,
  ]);

  useEffect(() => {
    if (!selectedPokemon) return;
    const pokemonId = selectedPokemon.id;
    if (pokemonMovesCache[pokemonId]) return;

    let cancelled = false;

    const run = async () => {
      try {
        if (pochampsActive) {
          const list = await fetchPokemonList();
          const pokemon = list.find((p) => p.id === pokemonId);
          const slug =
            selectedPokemon.metaSlug ||
            (pokemon
              ? resolvePochampsStorageSlug(pokemon.name)
              : resolvePochampsStorageSlug(selectedPokemon.nameKo));

          const res = await fetch(
            `/api/pokemon-meta/pokemon-moves?slug=${encodeURIComponent(slug)}`,
            { cache: 'no-store' },
          );
          const body = (await res.json()) as {
            names?: string[];
            error?: string;
          };
          if (!res.ok) {
            throw new Error(body.error ?? `조회 실패 (${res.status})`);
          }
          if (cancelled) return;
          setPokemonMovesCache((prev) => ({
            ...prev,
            [pokemonId]: {
              moves: filterMovesByPochampsNames(allMoves, body.names ?? []),
              error: null,
            },
          }));
          setPokemonMovesLoadingId((id) => (id === pokemonId ? null : id));
          return;
        }

        const res = await fetch(`/api/moves?pokemonId=${pokemonId}`, {
          cache: 'no-store',
        });
        const body = (await res.json()) as {
          moveIds?: number[];
          error?: string;
        };
        if (!res.ok) {
          throw new Error(body.error ?? `조회 실패 (${res.status})`);
        }
        if (cancelled) return;
        setPokemonMovesCache((prev) => ({
          ...prev,
          [pokemonId]: {
            moves: getMovesByIds(movesById, body.moveIds ?? []),
            error: null,
          },
        }));
        setPokemonMovesLoadingId((id) => (id === pokemonId ? null : id));
      } catch (err: unknown) {
        if (cancelled) return;
        setPokemonMovesCache((prev) => ({
          ...prev,
          [pokemonId]: {
            moves: [],
            error:
              err instanceof Error
                ? err.message
                : '포켓몬 기술 목록을 불러오지 못했습니다.',
          },
        }));
        setPokemonMovesLoadingId((id) => (id === pokemonId ? null : id));
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [selectedPokemon, pokemonMovesCache, pochampsActive]);

  const filteredMoves = useMemo(() => {
    let list = catalogMoves;
    const q = keyword.trim();

    if (q) {
      const matchedById = new Map<number, MoveDbEntry>();

      for (const move of catalogMoves) {
        if (move.koreanName.includes(q) || move.description.includes(q)) {
          matchedById.set(move.id, move);
        }
      }

      // 포챔스 인덱스가 stale여도 기술명(한글) 매칭은 allMoves에서 보강
      if (pochampsActive) {
        for (const move of allMoves) {
          if (move.koreanName.includes(q)) {
            matchedById.set(move.id, move);
          }
        }
      }

      const activeMoveId = parseMoveIdParam(searchParams.get('moveId'));
      if (activeMoveId != null) {
        const activeMove = movesById.get(activeMoveId);
        if (activeMove) matchedById.set(activeMove.id, activeMove);
      }

      if (pokemonSearch?.query === q && !pokemonSearch.loading) {
        for (const id of pokemonSearch.moveIds) {
          const move = movesById.get(id);
          if (move) matchedById.set(move.id, move);
        }
      }

      list = [...matchedById.values()];
    }

    if (activeType !== 'all') {
      list = list.filter((m) => m.type === activeType);
    }

    if (activeDamageClass !== 'all') {
      list = list.filter((m) => m.damage_class === activeDamageClass);
    }

    return list;
  }, [
    keyword,
    pokemonSearch,
    activeType,
    activeDamageClass,
    catalogMoves,
    pochampsActive,
    searchParams,
  ]);

  const q = keyword.trim();
  const pokemonSearchPending =
    (q.length > 0 &&
      (pokemonSearch === null ||
        pokemonSearch.query !== q ||
        pokemonSearch.loading)) ||
    (pochampsActive && pochampsMovesLoading);

  const learnableCacheEntry = learnableCache[moveIdsKey];
  const selectedPokemonMoves = selectedPokemon
    ? pokemonMovesCache[selectedPokemon.id]
    : undefined;
  const pochampsMoveIdSet = useMemo(
    () =>
      pochampsMoves != null ? new Set(pochampsMoves.map((m) => m.id)) : null,
    [pochampsMoves],
  );
  const selectedPokemonMovesFiltered =
    pochampsMoveIdSet != null
      ? (selectedPokemonMoves?.moves ?? []).filter((move) =>
          pochampsMoveIdSet.has(move.id),
        )
      : (selectedPokemonMoves?.moves ?? []);
  const canShowLearnablePanel =
    showLearnablePokemon && moveIdsByNameMatch.length > 0;
  const learnablePokemonList = canShowLearnablePanel
    ? (learnableCacheEntry?.pokemon ?? [])
    : [];
  const learnablePokemonLoading =
    canShowLearnablePanel &&
    !learnableCacheEntry &&
    learnableLoadingKey === moveIdsKey;
  const learnablePokemonError = canShowLearnablePanel
    ? (learnableCacheEntry?.error ?? null)
    : null;

  return (
    <div>
      <StickySearchBar
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        placeholderType="moves"
        pokemonSearchLoading={pokemonSearch?.query === q && pokemonSearch.loading}
        pokemonSearchError={
          pokemonSearch?.query === q ? pokemonSearch.error : null
        }
        matchedPokemonNames={
          pokemonSearch?.query === q ? pokemonSearch.pokemonNames : []
        }
      />
      <MoveList
        key={`${keyword}|${pokemonSearch?.moveIds.join(',') ?? ''}|${activeType}|${activeDamageClass}|${showLearnablePokemon}|${pochampsActive}`}
        moves={filteredMoves}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeDamageClass={activeDamageClass}
        onDamageClassChange={setActiveDamageClass}
        totalCount={catalogMoves.length}
        catalogLoading={pochampsActive && pochampsMovesLoading}
        catalogError={pochampsActive ? pochampsMovesError : null}
        pochampsOnly={pochampsActive}
        pokemonSearchPending={pokemonSearchPending}
        showLearnablePokemon={showLearnablePokemon}
        onShowLearnablePokemonChange={handleShowLearnablePokemonChange}
        canShowLearnablePokemon={moveIdsByNameMatch.length > 0}
        matchedMoveNames={moveIdsByNameMatch
          .map((id) => movesById.get(id)?.koreanName)
          .filter((name): name is string => Boolean(name))}
        learnablePokemon={learnablePokemonList}
        learnablePokemonLoading={learnablePokemonLoading}
        learnablePokemonError={learnablePokemonError}
        selectedPokemon={selectedPokemon}
        onSelectPokemon={handleSelectPokemon}
        pokemonMoves={selectedPokemonMovesFiltered}
        pokemonMovesLoading={
          selectedPokemon != null &&
          pokemonMovesLoadingId === selectedPokemon.id
        }
        pokemonMovesError={selectedPokemonMoves?.error ?? null}
        onMoveClick={handleMoveClick}
        onMoveSearch={handleMoveSearch}
        activeSearchMoveId={parseMoveIdParam(searchParams.get('moveId'))}
        searchKeyword={keyword}
      />
    </div>
  );
}
