'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import SearchBar from '@/components/searchBar/SearchBar';
import type { MoveDamageClassFilter } from '@/constants/moveFilters';
import type { MoveDbEntry } from '@/types/move';
import { buildMovesIndex, getMovesByIds } from '@/utils/movesDb';
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

type LearnablePokemonState = {
  moveIdsKey: string;
  pokemon: PokemonLearner[];
  loading: boolean;
  error: string | null;
};

export default function MovesPageContent() {
  const [keyword, setKeyword] = useState('');
  const [activeType, setActiveType] = useState<string | 'all'>('all');
  const [activeDamageClass, setActiveDamageClass] =
    useState<MoveDamageClassFilter>('all');
  const [pokemonSearch, setPokemonSearch] = useState<PokemonSearchState | null>(
    null,
  );
  const [showLearnablePokemon, setShowLearnablePokemon] = useState(false);
  const [learnablePokemon, setLearnablePokemon] =
    useState<LearnablePokemonState | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonLearner | null>(
    null,
  );
  const [pokemonMoves, setPokemonMoves] = useState<MoveDbEntry[]>([]);
  const [pokemonMovesLoading, setPokemonMovesLoading] = useState(false);
  const [pokemonMovesError, setPokemonMovesError] = useState<string | null>(
    null,
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

  const handleKeywordChange = useCallback((value: string) => {
    setKeyword(value);
    if (!value.trim()) {
      setPokemonSearch(null);
      setLearnablePokemon(null);
      setShowLearnablePokemon(false);
      setSelectedPokemon(null);
      setPokemonMoves([]);
      setPokemonMovesError(null);
    }
  }, []);

  const handleSelectPokemon = useCallback((pokemon: PokemonLearner) => {
    setSelectedPokemon((prev) =>
      prev?.id === pokemon.id ? null : pokemon,
    );
  }, []);

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
    if (!showLearnablePokemon || moveIdsByNameMatch.length === 0) {
      setLearnablePokemon(null);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      setLearnablePokemon((prev) => ({
        moveIdsKey,
        pokemon: prev?.moveIdsKey === moveIdsKey ? prev.pokemon : [],
        loading: true,
        error: null,
      }));

      fetch(
        `/api/moves?moveIds=${encodeURIComponent(moveIdsKey)}`,
        { cache: 'no-store' },
      )
        .then(async (res) => {
          const body = (await res.json()) as {
            pokemon?: PokemonLearner[];
            error?: string;
          };
          if (!res.ok) {
            throw new Error(body.error ?? `조회 실패 (${res.status})`);
          }
          if (!cancelled) {
            setLearnablePokemon({
              moveIdsKey,
              pokemon: body.pokemon ?? [],
              loading: false,
              error: null,
            });
          }
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            setLearnablePokemon({
              moveIdsKey,
              pokemon: [],
              loading: false,
              error:
                err instanceof Error
                  ? err.message
                  : '배울 수 있는 포켓몬 조회에 실패했습니다.',
            });
          }
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [showLearnablePokemon, moveIdsKey, moveIdsByNameMatch.length]);

  useEffect(() => {
    if (!selectedPokemon) {
      setPokemonMoves([]);
      setPokemonMovesError(null);
      setPokemonMovesLoading(false);
      return;
    }

    let cancelled = false;
    setPokemonMovesLoading(true);
    setPokemonMovesError(null);

    fetch(`/api/moves?pokemonId=${selectedPokemon.id}`, { cache: 'no-store' })
      .then(async (res) => {
        const body = (await res.json()) as {
          moveIds?: number[];
          error?: string;
        };
        if (!res.ok) {
          throw new Error(body.error ?? `조회 실패 (${res.status})`);
        }
        if (!cancelled) {
          setPokemonMoves(getMovesByIds(movesById, body.moveIds ?? []));
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setPokemonMoves([]);
          setPokemonMovesError(
            err instanceof Error
              ? err.message
              : '포켓몬 기술 목록을 불러오지 못했습니다.',
          );
        }
      })
      .finally(() => {
        if (!cancelled) setPokemonMovesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedPokemon]);

  useEffect(() => {
    setSelectedPokemon(null);
  }, [moveIdsKey, showLearnablePokemon]);

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

  return (
    <div className={s.page}>
      <SearchBar
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
        onShowLearnablePokemonChange={setShowLearnablePokemon}
        canShowLearnablePokemon={moveIdsByNameMatch.length > 0}
        matchedMoveNames={moveIdsByNameMatch
          .map((id) => movesById.get(id)?.koreanName)
          .filter((name): name is string => Boolean(name))}
        learnablePokemon={
          learnablePokemon?.moveIdsKey === moveIdsKey
            ? learnablePokemon.pokemon
            : []
        }
        learnablePokemonLoading={
          showLearnablePokemon &&
          moveIdsByNameMatch.length > 0 &&
          (learnablePokemon === null ||
            learnablePokemon.moveIdsKey !== moveIdsKey ||
            learnablePokemon.loading)
        }
        learnablePokemonError={
          learnablePokemon?.moveIdsKey === moveIdsKey
            ? learnablePokemon.error
            : null
        }
        selectedPokemon={selectedPokemon}
        onSelectPokemon={handleSelectPokemon}
        pokemonMoves={pokemonMoves}
        pokemonMovesLoading={pokemonMovesLoading}
        pokemonMovesError={pokemonMovesError}
      />
    </div>
  );
}
