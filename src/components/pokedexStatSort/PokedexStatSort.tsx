'use client';

import s from './pokedexStatSort.module.scss';

export type PokedexStatSortKey = 'H' | 'A' | 'B' | 'C' | 'D' | 'S' | 'total';
export type PokedexStatSortDirection = 'asc' | 'desc';
export type PokedexTypeSlotSort = 'front' | 'back';

export type PokedexStatSortRule = {
  key: PokedexStatSortKey;
  direction: PokedexStatSortDirection;
};

const STAT_SORT_OPTIONS: { key: PokedexStatSortKey; label: string }[] = [
  { key: 'H', label: 'HP' },
  { key: 'A', label: '공격' },
  { key: 'B', label: '방어' },
  { key: 'C', label: '특공' },
  { key: 'D', label: '특방' },
  { key: 'S', label: '스피드' },
  { key: 'total', label: '총합' },
];

type PokedexStatSortProps = {
  statSorts: PokedexStatSortRule[];
  onSortClick: (key: PokedexStatSortKey) => void;
  onSortDirectionClick: (key: PokedexStatSortKey) => void;
  onReset: () => void;
  typeSlotSort: PokedexTypeSlotSort | null;
  onTypeSlotSortChange: (slot: PokedexTypeSlotSort) => void;
  onTypeSlotReset: () => void;
  typeSlotEnabled?: boolean;
};

export default function PokedexStatSort({
  statSorts,
  onSortClick,
  onSortDirectionClick,
  onReset,
  typeSlotSort,
  onTypeSlotSortChange,
  onTypeSlotReset,
  typeSlotEnabled = true,
}: PokedexStatSortProps) {
  return (
    <details className={s.details}>
      <summary className={s.summary}>상세검색</summary>
      <div className={s.panel}>
        <div className={s.wrap} role="group" aria-label="종족값 복합 정렬">
          {STAT_SORT_OPTIONS.map(({ key, label }) => {
            const ruleIndex = statSorts.findIndex((rule) => rule.key === key);
            const active = ruleIndex >= 0;
            const rule = active ? statSorts[ruleIndex] : null;
            const arrow = rule?.direction === 'asc' ? '↑' : '↓';
            return (
              <div
                key={key}
                className={`${s.statGroup} ${active ? s.statGroupActive : ''}`}
              >
                <button
                  type="button"
                  className={s.statLabelBtn}
                  aria-pressed={active}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onSortClick(key);
                  }}
                >
                  {active ? (
                    <span className={s.priority}>{ruleIndex + 1}</span>
                  ) : null}
                  {label}
                </button>
                <button
                  type="button"
                  className={s.statDirBtn}
                  disabled={!active}
                  aria-label={`${label} ${rule?.direction === 'asc' ? '오름차순' : '내림차순'}, 방향 전환`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onSortDirectionClick(key);
                  }}
                >
                  {arrow}
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className={s.resetBtn}
            disabled={statSorts.length === 0}
            onClick={onReset}
          >
            리셋
          </button>
        </div>

        <div className={s.wrap} role="group" aria-label="타입 위치 정렬">
          <button
            type="button"
            className={`${s.btn} ${typeSlotSort === 'front' ? s.btnActive : ''}`}
            aria-pressed={typeSlotSort === 'front'}
            disabled={!typeSlotEnabled}
            onClick={() => onTypeSlotSortChange('front')}
          >
            앞 타입
          </button>
          <button
            type="button"
            className={`${s.btn} ${typeSlotSort === 'back' ? s.btnActive : ''}`}
            aria-pressed={typeSlotSort === 'back'}
            disabled={!typeSlotEnabled}
            onClick={() => onTypeSlotSortChange('back')}
          >
            뒷 타입
          </button>
          <button
            type="button"
            className={s.resetBtn}
            disabled={typeSlotSort == null}
            onClick={onTypeSlotReset}
          >
            리셋
          </button>
        </div>
      </div>
    </details>
  );
}
