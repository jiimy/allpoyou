'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import ModalFrame from '@/components/portalModal/ModalFrame';
import type { Pokemon } from '@/store/PokemonStore';
import {
  BASE_STAT_KEYS,
  BASE_STAT_LABEL,
  BASE_STAT_MAX,
  BASE_STAT_MIN,
  areBaseStatsModified,
  type BaseStatKey,
  type PokemonBaseStats,
} from '@/utils/pokemonBaseStats';
import s from './statCountModal.module.scss';

type StatCountModalProps = {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  pokemon: Pokemon;
  originalStats: PokemonBaseStats;
  onUpdateStat: (statKey: BaseStatKey, value: number) => void;
  onReset: () => void;
};

function clampStat(value: number): number {
  return Math.min(BASE_STAT_MAX, Math.max(BASE_STAT_MIN, value));
}

type StatSliderRowProps = {
  statKey: BaseStatKey;
  value: number;
  onUpdateStat: (statKey: BaseStatKey, value: number) => void;
};

function StatSliderRow({ statKey, value, onUpdateStat }: StatSliderRowProps) {
  const [localValue, setLocalValue] = useState(value);
  const [inputDraft, setInputDraft] = useState(String(value));
  const isDraggingRef = useRef(false);
  const fillPercent =
    ((localValue - BASE_STAT_MIN) / (BASE_STAT_MAX - BASE_STAT_MIN)) * 100;

  useEffect(() => {
    if (!isDraggingRef.current) {
      setLocalValue(value);
      setInputDraft(String(value));
    }
  }, [value]);

  const commitValue = useCallback(
    (next: number) => {
      const clamped = clampStat(next);
      setLocalValue(clamped);
      setInputDraft(String(clamped));
      if (clamped !== value) {
        onUpdateStat(statKey, clamped);
      }
    },
    [onUpdateStat, statKey, value],
  );

  const handleSliderInput = (next: number) => {
    const clamped = clampStat(next);
    setLocalValue(clamped);
    setInputDraft(String(clamped));
    if (clamped !== value) {
      onUpdateStat(statKey, clamped);
    }
  };

  const handleSliderRelease = () => {
    isDraggingRef.current = false;
  };

  const commitInputDraft = () => {
    const parsed = Number.parseInt(inputDraft, 10);
    if (Number.isNaN(parsed)) {
      setInputDraft(String(localValue));
      return;
    }
    commitValue(parsed);
  };

  return (
    <div className={s.statRow}>
      <span className={s.statLabel}>{BASE_STAT_LABEL[statKey]}</span>

      <div className={s.progressWrap}>
        <div className={s.progressTrack}>
          <div
            className={s.progressFill}
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <input
          type="range"
          className={s.progressInput}
          min={BASE_STAT_MIN}
          max={BASE_STAT_MAX}
          step={1}
          value={localValue}
          onPointerDown={() => {
            isDraggingRef.current = true;
          }}
          onInput={(e) => handleSliderInput(Number(e.currentTarget.value))}
          onChange={(e) => handleSliderInput(Number(e.target.value))}
          onPointerUp={handleSliderRelease}
          onPointerCancel={handleSliderRelease}
          onKeyUp={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              handleSliderInput(Number(e.currentTarget.value));
            }
          }}
          aria-label={`${BASE_STAT_LABEL[statKey]} 종족값`}
          aria-valuemin={BASE_STAT_MIN}
          aria-valuemax={BASE_STAT_MAX}
          aria-valuenow={localValue}
        />
      </div>

      <div className={s.statControls}>
        <button
          type="button"
          className={s.statBtn}
          disabled={localValue <= BASE_STAT_MIN}
          onClick={() => commitValue(localValue - 1)}
          aria-label={`${BASE_STAT_LABEL[statKey]} 1 감소`}
          title="-1"
        >
          −
        </button>
        <input
          type="number"
          className={s.statInput}
          min={BASE_STAT_MIN}
          max={BASE_STAT_MAX}
          step={1}
          value={inputDraft}
          onChange={(e) => setInputDraft(e.target.value)}
          onBlur={commitInputDraft}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commitInputDraft();
              e.currentTarget.blur();
            }
          }}
          aria-label={`${BASE_STAT_LABEL[statKey]} 종족값 직접 입력`}
        />
        <button
          type="button"
          className={s.statBtn}
          disabled={localValue >= BASE_STAT_MAX}
          onClick={() => commitValue(localValue + 1)}
          aria-label={`${BASE_STAT_LABEL[statKey]} 1 증가`}
          title="+1"
        >
          +
        </button>
      </div>
    </div>
  );
}

const StatCountModal = ({
  setOnModal,
  pokemon,
  originalStats,
  onUpdateStat,
  onReset,
}: StatCountModalProps) => {
  const isModified = areBaseStatsModified(pokemon, originalStats);

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim
      onClose
      dimClick
      className={s.modal}
    >
      <div className={s.header}>
        <h2 className={s.title}>종족값 조정</h2>
        <p className={s.subtitle}>{pokemon.nameKo}</p>
      </div>

      <div className={s.statList}>
        {BASE_STAT_KEYS.map((statKey) => (
          <StatSliderRow
            key={statKey}
            statKey={statKey}
            value={pokemon[statKey]}
            onUpdateStat={onUpdateStat}
          />
        ))}
      </div>

      <div className={s.footer}>
        <span className={s.totalLabel}>
          합계 <strong>{pokemon.total}</strong>
        </span>
        <button
          type="button"
          className={s.resetBtn}
          disabled={!isModified}
          onClick={onReset}
        >
          초기화
        </button>
      </div>
    </ModalFrame>
  );
};

export default StatCountModal;
