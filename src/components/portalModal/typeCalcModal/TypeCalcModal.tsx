'use client';

import classNames from 'classnames';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ModalFrame from '@/components/portalModal/ModalFrame';
import SelectPokeModal from '@/components/portalModal/selectPokeModal/SelectPokeModal';
import PokemonTooltip from '@/components/pokemonTooltip/PokemonTooltip';
import TypePicker from '@/components/type/TypePicker';
import TypeResult from '@/components/type/TypeResult';
import { typeTranslation } from '@/constants/pokemonType';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { useModalShortcut } from '@/hooks/useModalShortcut';
import {
  fetchPokemonList,
  type Pokemon,
} from '@/store/PokemonStore';
import { usePokemonPickStore } from '@/store/PokemonPickStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import { useTypeCalcStore } from '@/store/TypeCalcStore';
import type { ChildrenModalType } from '@/types/modal';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';

import s from './typeCalcModal.module.scss';

/** TypePicker 선택값(영문) → 포켓몬 types(한글) */
function toKoreanTypes(selected: string[]): string[] {
  return selected
    .filter(Boolean)
    .map((type) => typeTranslation[type] ?? type)
    .filter((type) => type in TYPE_COLOR);
}

/** 타입 계산기 모달 열기/닫기 단축키 */
export function useTypeCalcModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useModalShortcut('modal-type-calc', setOnModal);
}

type TypeCalcModalProps = ChildrenModalType;
type PanelView = 'calc' | 'pokemon';
type PokemonSortKey = 'name' | 'type';
type PokemonSortDirection = 'asc' | 'desc';

const POKEMON_SORT_LABELS: { key: PokemonSortKey; label: string }[] = [
  { key: 'name', label: '이름' },
  { key: 'type', label: '타입' },
];

const DEFAULT_POKEMON_SORT_DIRS: Record<PokemonSortKey, PokemonSortDirection> = {
  name: 'asc',
  type: 'desc',
};

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

const TypeCalcModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
}: TypeCalcModalProps) => {
  const mode = useTypeCalcStore((state) => state.mode);
  const attackSelected = useTypeCalcStore((state) => state.attackSelected);
  const defenseSelected = useTypeCalcStore((state) => state.defenseSelected);
  const recommendOn = useTypeCalcStore((state) => state.recommendOn);
  const setMode = useTypeCalcStore((state) => state.setMode);
  const setAttackSelected = useTypeCalcStore((state) => state.setAttackSelected);
  const setDefenseSelected = useTypeCalcStore((state) => state.setDefenseSelected);
  const setRecommendOn = useTypeCalcStore((state) => state.setRecommendOn);

  const selected = mode === 'attack' ? attackSelected : defenseSelected;
  const setSelected = mode === 'attack' ? setAttackSelected : setDefenseSelected;
  const maxSelection = mode === 'attack' ? 1 : 2;

  const [panel, setPanel] = useState<PanelView>('calc');
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [infoPokemon, setInfoPokemon] = useState<Pokemon | null>(null);
  const [finalEvolutionOnly, setFinalEvolutionOnly] = useState(false);
  const [pokemonSortKey, setPokemonSortKey] = useState<PokemonSortKey>('name');
  const [pokemonSortDirs, setPokemonSortDirs] = useState(DEFAULT_POKEMON_SORT_DIRS);
  const setPendingPokemon = usePokemonPickStore((state) => state.setPendingPokemon);
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);

  const hasTypeSelected = selected.some((t) => Boolean(t));
  const canGoPokemon = recommendOn && hasTypeSelected;
  const showPokemon = panel === 'pokemon' && canGoPokemon;
  const eActive = !showPokemon && canGoPokemon;
  const qActive = showPokemon;

  const matchedPokemon = useMemo(() => {
    const typesKo = toKoreanTypes(selected);
    if (typesKo.length === 0) return [];

    return allPokemon
      .filter((p) => typesKo.every((type) => p.types.includes(type)))
      .filter((p) => !finalEvolutionOnly || p.grade === 3)
      .sort((a, b) =>
        comparePokemonSort(a, b, pokemonSortKey, pokemonSortDirs[pokemonSortKey]),
      );
  }, [allPokemon, selected, finalEvolutionOnly, pokemonSortKey, pokemonSortDirs]);

  const handlePokemonSortClick = useCallback((key: PokemonSortKey) => {
    if (pokemonSortKey === key) {
      setPokemonSortDirs((prev) => ({
        ...prev,
        [key]: prev[key] === 'asc' ? 'desc' : 'asc',
      }));
      return;
    }
    setPokemonSortKey(key);
  }, [pokemonSortKey]);

  useEffect(() => {
    let cancelled = false;
    fetchPokemonList().then((list) => {
      if (!cancelled) setAllPokemon(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const goPokemon = useCallback(() => {
    if (!canGoPokemon) return;
    setPanel('pokemon');
  }, [canGoPokemon]);

  const goCalc = useCallback(() => {
    if (!showPokemon) return;
    setPanel('calc');
  }, [showPokemon]);

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
        goCalc();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [eActive, qActive, goPokemon, goCalc]);

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
      className={classNames(s.modal, className)}
    >
      <button
        type="button"
        className={classNames(s.leftArrow, s.arrow, { [s.arrowActive]: qActive })}
        disabled={!qActive}
        aria-label="타입 선택 화면으로"
        onClick={goCalc}
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
              <div className={s.titleRow}>
                <h2 className={s.title}>타입 계산기</h2>
                <label className={s.checkbox}>
                  <input
                    type="checkbox"
                    className={s.checkboxInput}
                    checked={recommendOn}
                    onChange={(e) => {
                      const next = e.target.checked;
                      setRecommendOn(next);
                      if (!next) setPanel('calc');
                    }}
                  />
                  포켓몬 추천
                </label>
              </div>

              <div className={s.modeTabs} role="tablist" aria-label="계산 모드">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'attack'}
                  className={classNames(s.modeTab, {
                    [s.modeTabActive]: mode === 'attack',
                  })}
                  onClick={() => setMode('attack')}
                >
                  공격타입
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'defense'}
                  className={classNames(s.modeTab, {
                    [s.modeTabActive]: mode === 'defense',
                  })}
                  onClick={() => setMode('defense')}
                >
                  방어타입
                </button>
              </div>

              <div className={s.typeWrap}>
                <div className={s.pickerPanel}>
                  <p className={s.panelLabel}>타입 선택</p>
                  <TypePicker
                    selected={selected}
                    onChange={setSelected}
                    maxSelection={maxSelection}
                    className={s.pickerGrid}
                  />
                </div>
                <div className={s.resultPanel}>
                  <TypeResult
                    mode={mode}
                    select={selected}
                    className={s.resultContent}
                    typeAreaClassName={s.resultGrid}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={s.panel} aria-hidden={!showPokemon}>
            <div className={s.content}>
              <h2 className={s.title}>
                추천 포켓몬
                <span className={s.count}>
                  {matchedPokemon.length}마리 · {toKoreanTypes(selected).join(' / ')}
                </span>
              </h2>
              <div className={s.listControls}>
                <label className={s.checkbox}>
                  <input
                    type="checkbox"
                    className={s.checkboxInput}
                    checked={finalEvolutionOnly}
                    onChange={(e) => setFinalEvolutionOnly(e.target.checked)}
                  />
                  최종진화
                </label>
                <span className={s.controlSep} aria-hidden>
                  /
                </span>
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
                {matchedPokemon.length === 0 ? (
                  <p className={s.empty}>해당 타입의 포켓몬이 없습니다.</p>
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
        className={classNames(s.rightArrow, s.arrow, { [s.arrowActive]: eActive })}
        disabled={!eActive}
        aria-label="추천 포켓몬 목록으로"
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

export default TypeCalcModal;
