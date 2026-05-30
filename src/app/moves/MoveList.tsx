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
} from '@/utils/moveDisplay';

import s from './moves.module.scss';

const PAGE_SIZE = 30;

function MoveRow({ move }: { move: MoveDbEntry }) {
  const typeKo = getMoveTypeKo(move.type);

  return (
    <li className={s.item}>
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
};

export default function MoveList({
  moves,
  activeType,
  onTypeChange,
  activeDamageClass,
  onDamageClassChange,
  totalCount,
  pokemonSearchPending = false,
}: MoveListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visibleMoves = useMemo(
    () => moves.slice(0, visibleCount),
    [moves, visibleCount],
  );

  const hasMore = visibleCount < moves.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, moves.length));
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [moves.length, hasMore]);

  return (
    <>
      <section className={s.filters}>
        <div className={s.filterGroup}>
          <span className={s.filterLabel}>타입</span>
          <div className={s.filterRow}>
            <button
              type="button"
              className={`${s.filterBtn} ${activeType === 'all' ? s.filterBtnActive : ''}`}
              onClick={() => onTypeChange('all')}
            >
              전체
            </button>
            {MOVE_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${s.filterBtn} ${activeType === opt.value ? s.filterBtnActive : ''}`}
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
              </button>
            ))}
          </div>
        </div>
        <div className={s.filterGroup}>
          <span className={s.filterLabel}>분류</span>
          <div className={s.filterRow}>
            {MOVE_DAMAGE_CLASS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${s.filterBtn} ${activeDamageClass === opt.value ? s.filterBtnActive : ''}`}
                onClick={() => onDamageClassChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

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
            <MoveRow key={move.id} move={move} />
          ))}
        </ul>
      )}
      {hasMore ? <div ref={sentinelRef} className={s.sentinel} aria-hidden /> : null}
    </>
  );
}
