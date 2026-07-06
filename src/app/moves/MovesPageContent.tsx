'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import StickySearchBar from '@/components/searchBar/StickySearchBar';
import type { MoveDamageClassFilter } from '@/constants/moveFilters';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';
import type { MoveDbEntry } from '@/types/move';
import { buildMovesIndex, getMovesByIds } from '@/utils/movesDb';
import { useMovePickStore } from '@/store/MovePickStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import movesData from '../../../public/data/moves-db.json';

import MoveList from './MoveList';

import s from './moves.module.scss';

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
  const moveId = parseMoveIdParam(searchParams.get('moveId'));
  return searchParams.get('learnable') === '1' || moveId != null;
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
    for (const move of allMoves) {
      if (move.koreanName.includes(q)) {
        ids.push(move.id);
      }
    }
    return [...new Set(ids)].sort((a, b) => a - b);
  }, [keyword]);

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

      fetch(`/api/moves?pokemonName=${encodeURIComponent(q)}`, {
        cache: 'no-store',
      })
        .then(async (res) => {
          const body = (await res.json()) as {
            moveIds?: number[];
            pokemonNames?: string[];
            error?: string;
          };
          if (!res.ok) {
            throw new Error(body.error ?? `조회 실패 (${res.status})`);
          }
          if (!cancelled) {
            setPokemonSearch({
              query: q,
              moveIds: body.moveIds ?? [],
              pokemonNames: body.pokemonNames ?? [],
              loading: false,
              error: null,
            });
          }
        })
        .catch((err: unknown) => {
          if (!cancelled) {
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
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [keyword]);

  useEffect(() => {
    if (moveIdsByNameMatch.length === 0) return;
    if (learnableCache[moveIdsKey]) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      setLearnableLoadingKey(moveIdsKey);

      fetch(`/api/moves?moveIds=${encodeURIComponent(moveIdsKey)}`, {
        cache: 'no-store',
      })
        .then(async (res) => {
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
        })
        .catch((err: unknown) => {
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
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [moveIdsKey, moveIdsByNameMatch.length, learnableCache]);

  useEffect(() => {
    if (!selectedPokemon) return;
    const pokemonId = selectedPokemon.id;
    if (pokemonMovesCache[pokemonId]) return;

    let cancelled = false;

    fetch(`/api/moves?pokemonId=${pokemonId}`, { cache: 'no-store' })
      .then(async (res) => {
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
      })
      .catch((err: unknown) => {
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
      });

    return () => {
      cancelled = true;
    };
  }, [selectedPokemon, pokemonMovesCache]);

  const filteredMoves = useMemo(() => {
    let list = allMoves;
    const q = keyword.trim();

    if (q) {
      const matchedIds = new Set<number>();

      for (const move of allMoves) {
        if (move.koreanName.includes(q) || move.description.includes(q)) {
          matchedIds.add(move.id);
        }
      }

      if (pokemonSearch?.query === q && !pokemonSearch.loading) {
        for (const id of pokemonSearch.moveIds) {
          const move = movesById.get(id);
          if (move) matchedIds.add(id);
        }
      }

      list = allMoves.filter((move) => matchedIds.has(move.id));
    }

    if (activeType !== 'all') {
      list = list.filter((m) => m.type === activeType);
    }

    if (activeDamageClass !== 'all') {
      list = list.filter((m) => m.damage_class === activeDamageClass);
    }

    return list;
  }, [keyword, pokemonSearch, activeType, activeDamageClass]);

  const q = keyword.trim();
  const pokemonSearchPending =
    q.length > 0 &&
    (pokemonSearch === null ||
      pokemonSearch.query !== q ||
      pokemonSearch.loading);

  const learnableCacheEntry = learnableCache[moveIdsKey];
  const selectedPokemonMoves = selectedPokemon
    ? pokemonMovesCache[selectedPokemon.id]
    : undefined;
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
        key={`${keyword}|${pokemonSearch?.moveIds.join(',') ?? ''}|${activeType}|${activeDamageClass}|${showLearnablePokemon}`}
        moves={filteredMoves}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeDamageClass={activeDamageClass}
        onDamageClassChange={setActiveDamageClass}
        totalCount={allMoves.length}
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
        pokemonMoves={selectedPokemonMoves?.moves ?? []}
        pokemonMovesLoading={
          selectedPokemon != null &&
          pokemonMovesLoadingId === selectedPokemon.id
        }
        pokemonMovesError={selectedPokemonMoves?.error ?? null}
        onMoveClick={handleMoveClick}
        onMoveSearch={handleMoveSearch}
      />
    </div>
  );
}
