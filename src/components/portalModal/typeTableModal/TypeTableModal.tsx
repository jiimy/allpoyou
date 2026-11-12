'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import ModalFrame from '../ModalFrame';
import PokemonTooltip from '@/components/pokemonTooltip/PokemonTooltip';
import TypeTable, {
  getTeamDefenseWeaknesses,
  type TypeTableMode,
  type TypeTablePokemon,
} from '@/components/typeTable/TypeTable';
import { typeChart, typeTranslation, type Type } from '@/constants/pokemonType';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { useActiveTeamTypeTablePokemons } from '@/hooks/useActiveTeamTypeTablePokemons';
import { useModalShortcut } from '@/hooks/useModalShortcut';
import {
  fetchPokemonList,
  type Pokemon,
} from '@/store/PokemonStore';
import { usePokemonListFilterStore } from '@/store/PokemonListFilterStore';
import { usePokemonPickStore } from '@/store/PokemonPickStore';
import { useSearchHistoryStore } from '@/store/SearchHistoryStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import { ChildrenModalType } from '@/types/modal';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';
import { applyPokemonListFilters } from '@/utils/pokemonListFilter';

import s from './typeTableModal.module.scss';

const SelectPokeModal = dynamic(
  () => import('@/components/portalModal/selectPokeModal/SelectPokeModal'),
  { ssr: false },
);

type TypeTableModalProps = ChildrenModalType & {
  /** 미전달 시 활성 팀(persist) 기준으로 표시 */
  pokemons?: (TypeTablePokemon | null)[];
};

type PanelView = 'table' | 'pokemon';
type PokemonSortKey = 'name' | 'type';
type PokemonSortDirection = 'asc' | 'desc';

/** 타입 상성표 모달 열기/닫기 단축키 */
export function useTypeTableModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useModalShortcut('modal-type-table', setOnModal);
}

const TABS: { id: TypeTableMode; label: string }[] = [
  { id: 'attack', label: '공격할 때' },
  { id: 'defense', label: '맞을 때' },
];

const POKEMON_SORT_LABELS: { key: PokemonSortKey; label: string }[] = [
  { key: 'name', label: '이름' },
  { key: 'type', label: '타입' },
];

const DEFAULT_POKEMON_SORT_DIRS: Record<PokemonSortKey, PokemonSortDirection> = {
  name: 'asc',
  type: 'desc',
};

const KOREAN_TO_ENGLISH: Record<string, Type> = Object.fromEntries(
  Object.entries(typeTranslation).map(([en, ko]) => [ko, en as Type]),
);

function comparePokemonSort(
  a: Pokemon,
  b: Pokemon,
  key: PokemonSortKey,
  direction: PokemonSortDirection,
): number {
  const dir = direction === 'asc' ? 1 : -1;
  if (key === 'name') {
    const byName = a.nameKo.localeCompare(b.nameKo, 'ko') * dir;
    if (byName !== 0) return byName;
    return a.number - b.number;
  }
  const typeA = a.types.join(' ');
  const typeB = b.types.join(' ');
  const byType = typeA.localeCompare(typeB, 'ko') * dir;
  if (byType !== 0) return byType;
  return a.nameKo.localeCompare(b.nameKo, 'ko');
}

/** 약점 타입(공격 타입)에 대해 2배 이상 넣는 타입인지 */
function isStrongAgainstWeakness(
  pokemonTypesKo: string[],
  weaknessEn: Type,
): boolean {
  for (const typeKo of pokemonTypesKo) {
    const typeEn = KOREAN_TO_ENGLISH[typeKo];
    if (!typeEn || !(typeEn in typeChart)) continue;
    if ((typeChart[weaknessEn][typeEn] ?? 1) >= 2) return true;
  }
  return false;
}

const TypeTableModal = ({
  setOnModal,
  pokemons,
  dimClick,
  isDim = true,
  className,
}: TypeTableModalProps) => {
  const { pokemons: activeTeamPokemons, isReady } =
    useActiveTeamTypeTablePokemons();
  const useStoreData = pokemons === undefined;
  const resolvedPokemons = useStoreData ? activeTeamPokemons : pokemons;
  const showLoading = useStoreData && !isReady;

  const [mode, setMode] = useState<TypeTableMode>('defense');
  const [panel, setPanel] = useState<PanelView>('table');
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [infoPokemon, setInfoPokemon] = useState<Pokemon | null>(null);
  const [selectedWeakTypes, setSelectedWeakTypes] = useState<string[]>([]);
  const [pokemonSortKey, setPokemonSortKey] = useState<PokemonSortKey>('name');
  const [pokemonSortDirs, setPokemonSortDirs] = useState(
    DEFAULT_POKEMON_SORT_DIRS,
  );

  const setPendingPokemon = usePokemonPickStore((state) => state.setPendingPokemon);
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);
  const excludeMega = usePokemonListFilterStore((state) => state.excludeMega);
  const excludeGmax = usePokemonListFilterStore((state) => state.excludeGmax);
  const finalEvolutionOnly = usePokemonListFilterStore(
    (state) => state.finalEvolutionOnly,
  );

  useEffect(() => {
    useSearchHistoryStore.getState().addModalEntry('type-table');
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchPokemonList().then((list) => {
      if (!cancelled) setAllPokemon(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const weaknessEntries = useMemo(
    () => getTeamDefenseWeaknesses(resolvedPokemons ?? []),
    [resolvedPokemons],
  );

  // 약점 목록이 바뀌면 기본 전체 선택으로 맞춤
  useEffect(() => {
    setSelectedWeakTypes(weaknessEntries.map((w) => w.typeKo));
  }, [weaknessEntries]);

  const canGoPokemon = mode === 'defense' && weaknessEntries.length > 0;
  const showPokemon = panel === 'pokemon' && canGoPokemon;
  const eActive = !showPokemon && canGoPokemon;
  const qActive = showPokemon;

  const goPokemon = useCallback(() => {
    if (!canGoPokemon) return;
    setPanel('pokemon');
  }, [canGoPokemon]);

  const goTable = useCallback(() => {
    if (!showPokemon) return;
    setPanel('table');
  }, [showPokemon]);

  useEffect(() => {
    if (mode !== 'defense' && panel === 'pokemon') {
      setPanel('table');
    }
  }, [mode, panel]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === 'e' && eActive) {
        event.preventDefault();
        goPokemon();
      } else if (key === 'q' && qActive) {
        event.preventDefault();
        goTable();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [eActive, qActive, goPokemon, goTable]);

  const toggleWeakType = useCallback((typeKo: string) => {
    setSelectedWeakTypes((prev) =>
      prev.includes(typeKo)
        ? prev.filter((t) => t !== typeKo)
        : [...prev, typeKo],
    );
  }, []);

  const matchedPokemon = useMemo(() => {
    if (selectedWeakTypes.length === 0) return [];

    const selectedEn = selectedWeakTypes
      .map((ko) => KOREAN_TO_ENGLISH[ko])
      .filter((t): t is Type => Boolean(t && t in typeChart));

    if (selectedEn.length === 0) return [];

    return applyPokemonListFilters(
      allPokemon.filter((pokemon) =>
        selectedEn.some((weakEn) =>
          isStrongAgainstWeakness(pokemon.types, weakEn),
        ),
      ),
      { excludeMega, excludeGmax, finalEvolutionOnly },
    ).sort((a, b) =>
      comparePokemonSort(a, b, pokemonSortKey, pokemonSortDirs[pokemonSortKey]),
    );
  }, [
    allPokemon,
    selectedWeakTypes,
    excludeMega,
    excludeGmax,
    finalEvolutionOnly,
    pokemonSortKey,
    pokemonSortDirs,
  ]);

  const handlePokemonSortClick = useCallback(
    (key: PokemonSortKey) => {
      if (pokemonSortKey === key) {
        setPokemonSortDirs((prev) => ({
          ...prev,
          [key]: prev[key] === 'asc' ? 'desc' : 'asc',
        }));
        return;
      }
      setPokemonSortKey(key);
    },
    [pokemonSortKey],
  );

  const handleViewInfo = useCallback((pokemon: Pokemon) => {
    setInfoPokemon(pokemon);
  }, []);

  const handleAddToTeam = useCallback(
    (pokemon: Pokemon) => {
      setPendingPokemon(pokemon);
      setTeamModalOpen(true);
    },
    [setPendingPokemon, setTeamModalOpen],
  );

  return (
    <>
      <ModalFrame
        setOnModal={setOnModal}
        isDim={dimClick || isDim}
        onClose
        dimClick={dimClick}
        className={classNames(s.type_table_modal, className)}
      >
        <button
          type="button"
          className={classNames(s.leftArrow, s.arrow, {
            [s.arrowActive]: qActive,
          })}
          disabled={!qActive}
          aria-label="상성표 화면으로"
          onClick={goTable}
        >
          Q
        </button>

        <div className={s.viewport}>
          <div
            className={classNames(s.slider, {
              [s.sliderPokemon]: showPokemon,
            })}
          >
            <div className={s.panel}>
              <div className={s.content}>
                <h2 className={s.title}>타입 상성표</h2>

                <div className={s.modeTabs} role="tablist" aria-label="상성 방향">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={mode === tab.id}
                      className={classNames(s.modeTab, {
                        [s.modeTabActive]: mode === tab.id,
                      })}
                      onClick={() => setMode(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {showLoading ? (
                  <p className={s.loading}>팀 정보를 불러오는 중…</p>
                ) : (
                  <div className={s.tableScroll}>
                    <TypeTable
                      pokemons={resolvedPokemons ?? []}
                      mode={mode}
                      onWeaknessClick={
                        mode === 'defense' ? goPokemon : undefined
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={s.panel} aria-hidden={!showPokemon}>
              <div className={s.content}>
                <h2 className={s.title}>
                  약점 보완 포켓몬
                  <span className={s.count}>{matchedPokemon.length}마리</span>
                </h2>

                <div
                  className={s.weakTypeTabs}
                  role="group"
                  aria-label="약점 타입 필터"
                >
                  {weaknessEntries.map((entry) => {
                    const on = selectedWeakTypes.includes(entry.typeKo);
                    return (
                      <button
                        key={entry.typeEn}
                        type="button"
                        className={classNames(s.weakTypeTab, {
                          [s.weakTypeTabActive]: on,
                        })}
                        style={
                          on
                            ? {
                                background: TYPE_COLOR[entry.typeKo] ?? '#999',
                                borderColor: TYPE_COLOR[entry.typeKo] ?? '#999',
                              }
                            : undefined
                        }
                        aria-pressed={on}
                        onClick={() => toggleWeakType(entry.typeKo)}
                      >
                        {entry.label}
                      </button>
                    );
                  })}
                </div>

                <div className={s.listControls}>
                  <div className={s.sortRow} role="group" aria-label="포켓몬 정렬">
                    {POKEMON_SORT_LABELS.map(({ key, label }, index) => {
                      const dir = pokemonSortDirs[key];
                      const arrow = dir === 'asc' ? '↑' : '↓';
                      const active = pokemonSortKey === key;
                      return (
                        <React.Fragment key={key}>
                          {index > 0 ? (
                            <span className={s.controlSep} aria-hidden>
                              /
                            </span>
                          ) : null}
                          <button
                            type="button"
                            className={classNames(s.sortBtn, {
                              [s.sortBtnActive]: active,
                            })}
                            onClick={() => handlePokemonSortClick(key)}
                            aria-pressed={active}
                            aria-label={`${label} ${dir === 'asc' ? '오름차순' : '내림차순'} 정렬`}
                          >
                            {label}
                            {arrow}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                <div className={s.pokemonList}>
                  {selectedWeakTypes.length === 0 ? (
                    <p className={s.empty}>약점 타입을 하나 이상 선택해 주세요.</p>
                  ) : matchedPokemon.length === 0 ? (
                    <p className={s.empty}>해당 약점에 강한 포켓몬이 없습니다.</p>
                  ) : (
                    matchedPokemon.map((pokemon) => (
                      <PokemonRecommendRow
                        key={pokemon.id}
                        pokemon={pokemon}
                        onViewInfo={handleViewInfo}
                        onAddToTeam={handleAddToTeam}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={classNames(s.rightArrow, s.arrow, {
            [s.arrowActive]: eActive,
          })}
          disabled={!eActive}
          aria-label="약점 보완 포켓몬 목록으로"
          onClick={goPokemon}
        >
          E
        </button>
      </ModalFrame>

      {infoPokemon ? (
        <SelectPokeModal
          pokemon={infoPokemon}
          setOnModal={(open) => {
            if (!open) setInfoPokemon(null);
          }}
        />
      ) : null}
    </>
  );
};

function PokemonRecommendRow({
  pokemon,
  onViewInfo,
  onAddToTeam,
}: {
  pokemon: Pokemon;
  onViewInfo: (pokemon: Pokemon) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getPokemonStaticImage(pokemon.images);

  return (
    <div
      className={classNames(s.pokemonRow, 'pokemonTooltipHost')}
      tabIndex={0}
    >
      <PokemonTooltip
        onViewInfo={(event) => {
          event.stopPropagation();
          onViewInfo(pokemon);
        }}
        onAddToTeam={(event) => {
          event.stopPropagation();
          onAddToTeam(pokemon);
        }}
      />
      <div className={s.pokemonThumb}>
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={pokemon.nameKo}
            width={40}
            height={40}
            onError={() => setImageError(true)}
          />
        ) : (
          <span className={s.thumbFallback}>?</span>
        )}
      </div>
      <div className={s.pokemonMeta}>
        <span className={s.pokemonName}>
          <span className={s.pokemonNumber}>#{pokemon.number}</span>
          {pokemon.nameKo}
        </span>
        <div className={s.pokemonTypes}>
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={s.typeBadge}
              style={{ background: TYPE_COLOR[type] ?? '#999' }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TypeTableModal;
