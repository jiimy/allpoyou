'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import SearchBar from '@/components/searchBar/SearchBar';
import type { MoveDamageClassFilter } from '@/constants/moveFilters';
import type { MoveDbEntry } from '@/types/move';
import { buildMovesIndex } from '@/utils/movesDb';
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

export default function MovesPageContent() {
  const [keyword, setKeyword] = useState('');
  const [activeType, setActiveType] = useState<string | 'all'>('all');
  const [activeDamageClass, setActiveDamageClass] =
    useState<MoveDamageClassFilter>('all');
  const [pokemonSearch, setPokemonSearch] = useState<PokemonSearchState | null>(
    null,
  );

  const handleKeywordChange = useCallback((value: string) => {
    setKeyword(value);
    if (!value.trim()) {
      setPokemonSearch(null);
    }
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
        pokemonSearchLoading={pokemonSearch?.query === q && pokemonSearch.loading}
        pokemonSearchError={
          pokemonSearch?.query === q ? pokemonSearch.error : null
        }
        matchedPokemonNames={
          pokemonSearch?.query === q ? pokemonSearch.pokemonNames : []
        }
      />
      <MoveList
        key={`${keyword}|${pokemonSearch?.moveIds.join(',') ?? ''}|${activeType}|${activeDamageClass}`}
        moves={filteredMoves}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeDamageClass={activeDamageClass}
        onDamageClassChange={setActiveDamageClass}
        totalCount={allMoves.length}
        pokemonSearchPending={pokemonSearchPending}
      />
    </div>
  );
}
