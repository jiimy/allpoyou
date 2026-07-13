'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  MOVE_DAMAGE_CLASS_OPTIONS,
  MOVE_TYPE_OPTIONS,
  type MoveDamageClassFilter,
} from '@/constants/moveFilters';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import type { MoveDbEntry } from '@/types/move';
import {
  formatMoveStat,
  getDamageClassLabel,
  getMoveTypeKo,
  sortMovesByKoreanName,
} from '@/utils/moveDisplay';

import s from './moves.module.scss';
import PokemonTooltip from '@/components/pokemonTooltip/PokemonTooltip';
import { FilterButton } from '@/components/button/Button';

const PAGE_SIZE = 30;

function MoveRow({
  move,
  onMoveClick,
  onMoveSearch,
}: {
  move: MoveDbEntry;
  onMoveClick?: (move: MoveDbEntry) => void;
  onMoveSearch?: (move: MoveDbEntry) => void;
}) {
  const typeKo = getMoveTypeKo(move.type);
  const clickable = onMoveClick != null;

  return (
    <li
      className={`${s.item} ${clickable ? s.itemClickable : ''} pokemonTooltipHost`}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? () => onMoveClick?.(move) : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onMoveClick?.(move);
              }
            }
          : undefined
      }
    >
      <PokemonTooltip
        viewInfoLabel="기술검색"
        addToTeamLabel="기술부여"
        onViewInfo={(event) => {
          event.stopPropagation();
          onMoveSearch?.(move);
        }}
        onAddToTeam={(event) => {
          event.stopPropagation();
          onMoveClick?.(move);
        }}
      />
      <h3 className={s.name}>{move.koreanName}</h3>
      <p className={s.description}>{move.description}</p>
      <p className={s.meta}>
        <span>
          <span className={s.metaLabel}>타입 </span>
          <span
            className={s.typeBadge}
            style={{ background: TYPE_COLOR[typeKo] ?? '#999' }}
          >
            {typeKo}
          </span>
        </span>
        <span>
          <span className={s.metaLabel}>분류 </span>
          {getDamageClassLabel(move.damage_class)}
        </span>
        <span>
          <span className={s.metaLabel}>위력 </span>
          {formatMoveStat(move.power)}
        </span>
        <span>
          <span className={s.metaLabel}>명중률 </span>
          {formatMoveStat(move.accuracy)}
        </span>
        <span>
          <span className={s.metaLabel}>PP </span>
          {formatMoveStat(move.pp)}
        </span>
      </p>
    </li>
  );
}

type MoveListProps = {
  moves: MoveDbEntry[];
  activeType: string | 'all';
  onTypeChange: (type: string | 'all') => void;
  activeDamageClass: MoveDamageClassFilter;
  onDamageClassChange: (value: MoveDamageClassFilter) => void;
  totalCount: number;
  pokemonSearchPending?: boolean;
  showLearnablePokemon: boolean;
  onShowLearnablePokemonChange: (checked: boolean) => void;
  canShowLearnablePokemon: boolean;
  matchedMoveNames: string[];
  learnablePokemon: { id: number; number: number; nameKo: string }[];
  learnablePokemonLoading: boolean;
  learnablePokemonError: string | null;
  selectedPokemon: { id: number; number: number; nameKo: string } | null;
  onSelectPokemon: (pokemon: { id: number; number: number; nameKo: string }) => void;
  pokemonMoves: MoveDbEntry[];
  pokemonMovesLoading: boolean;
  pokemonMovesError: string | null;
  onMoveClick?: (move: MoveDbEntry) => void;
  onMoveSearch?: (move: MoveDbEntry) => void;
};

export default function MoveList({
  moves,
  activeType,
  onTypeChange,
  activeDamageClass,
  onDamageClassChange,
  totalCount,
  pokemonSearchPending = false,
  showLearnablePokemon,
  onShowLearnablePokemonChange,
  canShowLearnablePokemon,
  matchedMoveNames,
  learnablePokemon,
  learnablePokemonLoading,
  learnablePokemonError,
  selectedPokemon,
  onSelectPokemon,
  pokemonMoves,
  pokemonMovesLoading,
  pokemonMovesError,
  onMoveClick,
  onMoveSearch,
}: MoveListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [pokemonMovesVisibleCount, setPokemonMovesVisibleCount] =
    useState(PAGE_SIZE);
  const [pokemonMovesType, setPokemonMovesType] = useState<string | 'all'>(
    'all',
  );
  const [pokemonMovesDamageClass, setPokemonMovesDamageClass] =
    useState<MoveDamageClassFilter>('all');
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pokemonMovesSentinelRef = useRef<HTMLDivElement>(null);

  const sortedMoves = useMemo(
    () => sortMovesByKoreanName(moves),
    [moves],
  );

  const visibleMoves = useMemo(
    () => sortedMoves.slice(0, visibleCount),
    [sortedMoves, visibleCount],
  );

  const hasMore = visibleCount < sortedMoves.length;

  const filteredPokemonMoves = useMemo(
    () =>
      sortMovesByKoreanName(
        pokemonMoves.filter((move) => {
          if (pokemonMovesType !== 'all' && move.type !== pokemonMovesType) {
            return false;
          }
          if (
            pokemonMovesDamageClass !== 'all' &&
            move.damage_class !== pokemonMovesDamageClass
          ) {
            return false;
          }
          return true;
        }),
      ),
    [pokemonMoves, pokemonMovesType, pokemonMovesDamageClass],
  );

  const visiblePokemonMoves = useMemo(
    () => filteredPokemonMoves.slice(0, pokemonMovesVisibleCount),
    [filteredPokemonMoves, pokemonMovesVisibleCount],
  );

  const hasMorePokemonMoves =
    pokemonMovesVisibleCount < filteredPokemonMoves.length;

  const pokemonKey = selectedPokemon?.id ?? 'none';
  const [prevPokemonKey, setPrevPokemonKey] = useState(pokemonKey);
  if (prevPokemonKey !== pokemonKey) {
    setPrevPokemonKey(pokemonKey);
    setPokemonMovesVisibleCount(PAGE_SIZE);
    setPokemonMovesType('all');
    setPokemonMovesDamageClass('all');
  }

  const handlePokemonMovesTypeChange = (type: string | 'all') => {
    setPokemonMovesType(type);
    setPokemonMovesVisibleCount(PAGE_SIZE);
  };

  const handlePokemonMovesDamageClassChange = (
    value: MoveDamageClassFilter,
  ) => {
    setPokemonMovesDamageClass(value);
    setPokemonMovesVisibleCount(PAGE_SIZE);
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, sortedMoves.length));
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sortedMoves.length, hasMore]);

  useEffect(() => {
    const sentinel = pokemonMovesSentinelRef.current;
    if (!sentinel || !hasMorePokemonMoves) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPokemonMovesVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, filteredPokemonMoves.length),
          );
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredPokemonMoves.length, hasMorePokemonMoves]);

  return (
    <>
      <section className={s.filters}>
        <div className={s.filterGroup}>
          <span className={s.filterLabel}>타입</span>
          <div className={s.filterRow}>
            <FilterButton
              type="button"
              active={activeType === 'all'}
              onClick={() => onTypeChange('all')}
            >
              전체
            </FilterButton>
            {MOVE_TYPE_OPTIONS.map((opt) => (
              <FilterButton
                key={opt.value}
                type="button"
                active={activeType === opt.value}
                style={
                  activeType === opt.value
                    ? {
                        background: TYPE_COLOR[opt.label] ?? '#999',
                        borderColor: TYPE_COLOR[opt.label] ?? '#999',
                        color: '#fff',
                      }
                    : undefined
                }
                onClick={() => onTypeChange(opt.value)}
              >
                {opt.label}
              </FilterButton>
            ))}
          </div>
        </div>
        <div className={s.filterGroup}>
          <span className={s.filterLabel}>분류</span>
          <div className={s.filterRow}>
            {MOVE_DAMAGE_CLASS_OPTIONS.map((opt) => (
              <FilterButton
                key={opt.value}
                type="button"
                active={activeDamageClass === opt.value}
                onClick={() => onDamageClassChange(opt.value)}
              >
                {opt.label}
              </FilterButton>
            ))}
          </div>
        </div>
        {canShowLearnablePokemon ? (
          <label className={s.learnableCheck}>
            <input
              type="checkbox"
              checked={showLearnablePokemon}
              onChange={(e) => onShowLearnablePokemonChange(e.target.checked)}
            />
            <span>배울 수 있는 포켓몬</span>
          </label>
        ) : null}
      </section>

      {showLearnablePokemon && canShowLearnablePokemon ? (
        <section className={s.learnableSection}>
          <h3 className={s.learnableTitle}>
            배울 수 있는 포켓몬
            {matchedMoveNames.length > 0
              ? ` · ${matchedMoveNames.join(', ')}`
              : ''}
          </h3>
          {learnablePokemonLoading ? (
            <p className={s.learnableEmpty}>포켓몬 목록을 불러오는 중…</p>
          ) : learnablePokemonError ? (
            <p className={s.learnableError}>{learnablePokemonError}</p>
          ) : learnablePokemon.length === 0 ? (
            <p className={s.learnableEmpty}>
              이 기술을 배울 수 있는 포켓몬이 없습니다.
            </p>
          ) : (
            <>
              <p className={s.learnableCount}>
                {learnablePokemon.length.toLocaleString()}마리
              </p>
              <ul className={s.learnableList}>
                {learnablePokemon.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={`${s.learnableItem} ${selectedPokemon?.id === p.id ? s.learnableItemActive : ''}`}
                      onClick={() => onSelectPokemon(p)}
                    >
                      {p.nameKo}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      ) : null}

      <p className={s.resultCount}>
        {moves.length.toLocaleString()}개 / {totalCount.toLocaleString()}개
      </p>

      {pokemonSearchPending ? (
        <p className={s.empty}>포켓몬 기술을 불러오는 중…</p>
      ) : moves.length === 0 ? (
        <p className={s.empty}>조건에 맞는 기술이 없습니다.</p>
      ) : (
        <ul className={s.list}>
          {visibleMoves.map((move) => (
            <MoveRow
              key={move.id}
              move={move}
              onMoveClick={onMoveClick}
              onMoveSearch={onMoveSearch}
            />
          ))}
        </ul>
      )}
      {hasMore ? <div ref={sentinelRef} className={s.sentinel} aria-hidden /> : null}

      {selectedPokemon ? (
        <section className={s.pokemonMovesSection}>
          <h3 className={s.pokemonMovesTitle}>
            {selectedPokemon.nameKo} · 배울 수 있는 기술
          </h3>
          {pokemonMovesLoading ? (
            <p className={s.empty}>기술 목록을 불러오는 중…</p>
          ) : pokemonMovesError ? (
            <p className={s.learnableError}>{pokemonMovesError}</p>
          ) : pokemonMoves.length === 0 ? (
            <p className={s.empty}>배울 수 있는 기술이 없습니다.</p>
          ) : (
            <>
              <div className={s.filters}>
                <div className={s.filterGroup}>
                  <span className={s.filterLabel}>타입</span>
                  <div className={s.filterRow}>
                    <FilterButton
                      type="button"
                      active={pokemonMovesType === 'all'}
                      onClick={() => handlePokemonMovesTypeChange('all')}
                    >
                      전체
                    </FilterButton>
                    {MOVE_TYPE_OPTIONS.map((opt) => (
                      <FilterButton
                        key={opt.value}
                        type="button"
                        active={pokemonMovesType === opt.value}
                        style={
                          pokemonMovesType === opt.value
                            ? {
                                background: TYPE_COLOR[opt.label] ?? '#999',
                                borderColor: TYPE_COLOR[opt.label] ?? '#999',
                                color: '#fff',
                              }
                            : undefined
                        }
                        onClick={() => handlePokemonMovesTypeChange(opt.value)}
                      >
                        {opt.label}
                      </FilterButton>
                    ))}
                  </div>
                </div>
                <div className={s.filterGroup}>
                  <span className={s.filterLabel}>분류</span>
                  <div className={s.filterRow}>
                    {MOVE_DAMAGE_CLASS_OPTIONS.map((opt) => (
                      <FilterButton
                        key={opt.value}
                        type="button"
                        active={pokemonMovesDamageClass === opt.value}
                        onClick={() =>
                          handlePokemonMovesDamageClassChange(opt.value)
                        }
                      >
                        {opt.label}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              </div>
              <br/>
              <p className={s.resultCount}>
                {filteredPokemonMoves.length.toLocaleString()}개 /{' '}
                {pokemonMoves.length.toLocaleString()}개
              </p>
              {filteredPokemonMoves.length === 0 ? (
                <p className={s.empty}>조건에 맞는 기술이 없습니다.</p>
              ) : (
                <ul className={s.list}>
                  {visiblePokemonMoves.map((move) => (
                    <MoveRow
                      key={move.id}
                      move={move}
                      onMoveClick={onMoveClick}
                      onMoveSearch={onMoveSearch}
                    />
                  ))}
                </ul>
              )}
              {hasMorePokemonMoves ? (
                <div
                  ref={pokemonMovesSentinelRef}
                  className={s.sentinel}
                  aria-hidden
                />
              ) : null}
            </>
          )}
        </section>
      ) : null}
    </>
  );
}
