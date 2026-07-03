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

export type TeamStatSlot = {
  index: number;
  pokemon: Pokemon;
  originalStats: PokemonBaseStats;
};

type StatCountModalProps = {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  initialSlotIndex: number;
  teamSlots: TeamStatSlot[];
  onUpdateStat: (slotIndex: number, statKey: BaseStatKey, value: number) => void;
  onReset: (slotIndex: number) => void;
  onCommitSlot: (slotIndex: number) => void;
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
  initialSlotIndex,
  teamSlots,
  onUpdateStat,
  onReset,
  onCommitSlot,
}: StatCountModalProps) => {
  const [activeSlotIndex, setActiveSlotIndex] = useState(initialSlotIndex);
  const [prevInitialSlotIndex, setPrevInitialSlotIndex] =
    useState(initialSlotIndex);

  if (prevInitialSlotIndex !== initialSlotIndex) {
    setPrevInitialSlotIndex(initialSlotIndex);
    setActiveSlotIndex(initialSlotIndex);
  }

  const activeSlot =
    teamSlots.find((slot) => slot.index === activeSlotIndex) ?? teamSlots[0];

  const handleSelectSlot = useCallback(
    (slotIndex: number) => {
      if (slotIndex === activeSlotIndex) return;

      const currentSlot = teamSlots.find((slot) => slot.index === activeSlotIndex);
      if (
        currentSlot &&
        areBaseStatsModified(currentSlot.pokemon, currentSlot.originalStats)
      ) {
        onCommitSlot(activeSlotIndex);
      }

      setActiveSlotIndex(slotIndex);
    },
    [activeSlotIndex, onCommitSlot, teamSlots],
  );

  const handleClose = useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (value) => {
      const nextOpen =
        typeof value === 'function' ? value(true) : value;

      if (!nextOpen) {
        const currentSlot =
          teamSlots.find((slot) => slot.index === activeSlotIndex) ??
          teamSlots[0];
        if (
          currentSlot &&
          areBaseStatsModified(currentSlot.pokemon, currentSlot.originalStats)
        ) {
          onCommitSlot(activeSlotIndex);
        }
      }

      setOnModal(nextOpen);
    },
    [activeSlotIndex, onCommitSlot, setOnModal, teamSlots],
  );

  if (!activeSlot) {
    return null;
  }

  const { pokemon, originalStats } = activeSlot;
  const isModified = areBaseStatsModified(pokemon, originalStats);

  return (
    <ModalFrame
      setOnModal={handleClose}
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
            onUpdateStat={(key, value) =>
              onUpdateStat(activeSlotIndex, key, value)
            }
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
          onClick={() => onReset(activeSlotIndex)}
        >
          초기화
        </button>
      </div>

      {teamSlots.length > 1 ? (
        <section className={s.teamOverview} aria-label="팀 종족값 비교">
          <h3 className={s.teamOverviewTitle}>팀 종족값</h3>
          <div className={s.teamOverviewScroll}>
            {teamSlots.map((slot) => {
              const isActive = slot.index === activeSlotIndex;
              const slotModified = areBaseStatsModified(
                slot.pokemon,
                slot.originalStats,
              );

              return (
                <button
                  key={slot.index}
                  type="button"
                  className={`${s.teamColumn} ${isActive ? s.teamColumnActive : ''}`}
                  onClick={() => handleSelectSlot(slot.index)}
                  aria-pressed={isActive}
                >
                  <div className={s.teamColumnName}>
                    {slot.pokemon.nameKo}
                    {slotModified ? (
                      <span className={s.teamColumnModified}>수정됨</span>
                    ) : null}
                  </div>
                  {BASE_STAT_KEYS.map((statKey) => (
                    <div key={statKey} className={s.teamColumnStat}>
                      <span className={s.teamColumnStatLabel}>
                        {BASE_STAT_LABEL[statKey]}
                      </span>
                      <span className={s.teamColumnStatValue}>
                        {slot.pokemon[statKey]}
                      </span>
                    </div>
                  ))}
                  <div className={s.teamColumnTotal}>
                    합계 {slot.pokemon.total}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}
    </ModalFrame>
  );
};

export default StatCountModal;
