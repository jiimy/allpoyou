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
import {
  getLearnableMovesFromLocalFiles,
  getLocalLearnsetOverlay,
  getNoPochamsLearnerNameKos,
  mergePochampsLearnset,
} from '@/utils/localPokemonMoves';
import { fetchPokemonList, getCachedPokemonList } from '@/store/PokemonStore';
import { useMovePickStore } from '@/store/MovePickStore';
import { usePochampsStore } from '@/store/PochampsStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import { usePokemonListFilterStore } from '@/store/PokemonListFilterStore';
import { applyPokemonListFilters } from '@/utils/pokemonListFilter';
import {
  isGmaxDisplayName,
  isMegaDisplayName,
} from '@/utils/pokemonName';
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
  const excludeMega = usePokemonListFilterStore((state) => state.excludeMega);
  const excludeGmax = usePokemonListFilterStore((state) => state.excludeGmax);
  const finalEvolutionOnly = usePokemonListFilterStore(
    (state) => state.finalEvolutionOnly,
  );
  const [pochampsMoveNames, setPochampsMoveNames] = useState<string[] | null>(
    null,
  );
  const [pochampsMovesError, setPochampsMovesError] = useState<string | null>(
    null,
  );
  const [pokemonCatalog, setPokemonCatalog] = useState(() =>
    getCachedPokemonList(),
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
    void fetchPokemonList()
      .then((list) => setPokemonCatalog(list))
      .catch(() => {});
  }, []);

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
    const cacheKey = `${moveIdsKey}|${pochampsActive ? 'pochams' : 'standard'}`;
    if (learnableCache[cacheKey]) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      setLearnableLoadingKey(cacheKey);

      const run = async () => {
        try {
          const learnsetMode = pochampsActive ? 'pochams' : 'standard';
          const res = await fetch(
            `/api/moves?moveIds=${encodeURIComponent(moveIdsKey)}&learnsetMode=${learnsetMode}`,
            { cache: 'no-store' },
          );
          const body = (await res.json()) as {
            pokemon?: PokemonLearner[];
            error?: string;
          };
          if (!res.ok) {
            throw new Error(body.error ?? `조회 실패 (${res.status})`);
          }

          let pokemon = body.pokemon ?? [];

          // ON: Storage learners와 합치고, no-pochams 태그는 제외
          if (pochampsActive) {
            const moveKeys = moveIdsByNameMatch
              .map((id) => movesById.get(id))
              .filter((move): move is MoveDbEntry => move != null)
              .flatMap((move) => [
                toChampionsMoveLookupKey(move.englishName),
                toChampionsMoveLookupKey(move.koreanName),
              ])
              .filter(Boolean);
            const uniqueKeys = [...new Set(moveKeys)];

            if (uniqueKeys.length > 0) {
              const storageRes = await fetch(
                `/api/pokemon-meta/moves/learners?keys=${encodeURIComponent(uniqueKeys.join(','))}`,
                { cache: 'no-store' },
              );
              const storageBody = (await storageRes.json()) as {
                learners?: Array<{ pokemonName: string; pokemonSlug: string }>;
                error?: string;
              };
              if (storageRes.ok) {
                const list = await fetchPokemonList();
                const byNameKo = new Map<string, PokemonLearner>();
                for (const row of pokemon) {
                  byNameKo.set(row.nameKo, row);
                }
                for (const learner of storageBody.learners ?? []) {
                  const matched = resolvePokemonFromPochampsLearner(
                    learner,
                    list,
                  );
                  if (!matched) continue;
                  if (byNameKo.has(matched.nameKo)) continue;
                  byNameKo.set(matched.nameKo, {
                    id: matched.number,
                    number: matched.number,
                    nameKo: matched.nameKo,
                    metaSlug: learner.pokemonSlug,
                  });
                }
                pokemon = [...byNameKo.values()].sort((a, b) =>
                  a.nameKo.localeCompare(b.nameKo, 'ko'),
                );
              }
            }

            const blocked = await getNoPochamsLearnerNameKos(moveIdsByNameMatch);
            if (blocked.size > 0) {
              pokemon = pokemon.filter((row) => !blocked.has(row.nameKo));
            }
          }

          if (cancelled) return;
          setLearnableCache((prev) => ({
            ...prev,
            [cacheKey]: {
              pokemon,
              error: null,
            },
          }));
          setLearnableLoadingKey((key) => (key === cacheKey ? null : key));
        } catch (err: unknown) {
          if (cancelled) return;
          const message =
            err instanceof Error
              ? err.message
              : '배울 수 있는 포켓몬 조회에 실패했습니다.';
          setLearnableCache((prev) => ({
            ...prev,
            [cacheKey]: { pokemon: [], error: message },
          }));
          setLearnableLoadingKey((key) => (key === cacheKey ? null : key));
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
        const learnsetMode = pochampsActive ? 'pochams' : 'standard';
        const list = await fetchPokemonList();
        const pokemon =
          list.find((p) => p.id === pokemonId) ??
          list.find((p) => p.nameKo === selectedPokemon.nameKo) ??
          list.find((p) => p.number === selectedPokemon.number);
        const nameKo = pokemon?.nameKo ?? selectedPokemon.nameKo;
        const pokemonKey = {
          id: pokemonId,
          number: pokemon?.number ?? selectedPokemon.number,
          nameKo,
        };

        if (pochampsActive) {
          const slug =
            selectedPokemon.metaSlug ||
            (pokemon
              ? resolvePochampsStorageSlug(pokemon.name)
              : resolvePochampsStorageSlug(nameKo));

          const [overlay, res] = await Promise.all([
            getLocalLearnsetOverlay(pokemonKey),
            fetch(
              `/api/pokemon-meta/pokemon-moves?slug=${encodeURIComponent(slug)}`,
              { cache: 'no-store' },
            ),
          ]);
          const body = (await res.json()) as {
            names?: string[];
            error?: string;
          };
          if (!res.ok) {
            throw new Error(body.error ?? `조회 실패 (${res.status})`);
          }
          if (cancelled) return;
          const storageMoves = filterMovesByPochampsNames(
            allMoves,
            body.names ?? [],
          );
          setPokemonMovesCache((prev) => ({
            ...prev,
            [pokemonId]: {
              moves: mergePochampsLearnset(storageMoves, overlay),
              error: null,
            },
          }));
          setPokemonMovesLoadingId((id) => (id === pokemonId ? null : id));
          return;
        }

        const localMoves = await getLearnableMovesFromLocalFiles(pokemonKey, {
          pochampsActive: false,
        });

        if (localMoves.length > 0) {
          if (cancelled) return;
          setPokemonMovesCache((prev) => ({
            ...prev,
            [pokemonId]: { moves: localMoves, error: null },
          }));
          setPokemonMovesLoadingId((id) => (id === pokemonId ? null : id));
          return;
        }

        const res = await fetch(
          `/api/moves?pokemonId=${pokemonId}&nameKo=${encodeURIComponent(nameKo)}&learnsetMode=${learnsetMode}`,
          { cache: 'no-store' },
        );
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

  const learnableCacheKey = `${moveIdsKey}|${pochampsActive ? 'pochams' : 'standard'}`;
  const learnableCacheEntry = learnableCache[learnableCacheKey];
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
  const learnablePokemonList = useMemo(() => {
    if (!canShowLearnablePanel) return [];
    const raw = learnableCacheEntry?.pokemon ?? [];
    if (!excludeMega && !excludeGmax && !finalEvolutionOnly) return raw;

    // moves API id는 도감번호라 pokemon.csv row id와 다름 → nameKo로 매칭
    const byNameKo = new Map(
      pokemonCatalog.map((pokemon) => [pokemon.nameKo, pokemon]),
    );

    return raw.filter((learner) => {
      if (excludeMega && isMegaDisplayName(learner.nameKo)) return false;
      if (excludeGmax && isGmaxDisplayName(learner.nameKo)) return false;

      const full = byNameKo.get(learner.nameKo);
      if (!full) {
        // grade 정보가 없으면 최종진화 필터는 통과
        return true;
      }

      return (
        applyPokemonListFilters([full], {
          excludeMega,
          excludeGmax,
          finalEvolutionOnly,
        }).length > 0
      );
    });
  }, [
    canShowLearnablePanel,
    learnableCacheEntry,
    pokemonCatalog,
    excludeMega,
    excludeGmax,
    finalEvolutionOnly,
  ]);
  const learnablePokemonLoading =
    canShowLearnablePanel &&
    !learnableCacheEntry &&
    learnableLoadingKey === learnableCacheKey;
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
