'use client';

import React, { useCallback, useRef } from 'react';
import cn from 'classnames';
import { useOutOfClick } from '@/hooks/useOutOfClick';
import {
  ALL_POKEMON_TYPES_KO,
  TYPE_COLOR,
} from '@/constants/pokemonTypeColor';
import type { ActiveTypeSlot, TypePickerSource } from '@/hooks/useTeamEditor';
import s from '@/app/make-team/maekTeam.module.scss';

export type PokemonTypePickerProps = {
  source: TypePickerSource;
  pokemonIndex: number;
  types: string[];
  activeTypeSlot: ActiveTypeSlot;
  isClient: boolean;
  onTypeSlotActivate: (
    pokemonIndex: number,
    typeIndex: number,
    source: TypePickerSource,
  ) => void;
  onSelectType: (pokemonIndex: number, typeIndex: number, newType: string) => void;
  onActiveTypeSlotChange: (slot: ActiveTypeSlot) => void;
  className?: string;
};

export function PokemonTypePicker({
  source,
  pokemonIndex,
  types,
  activeTypeSlot,
  isClient,
  onTypeSlotActivate,
  onSelectType,
  onActiveTypeSlotChange,
  className,
}: PokemonTypePickerProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isPickerActive =
    activeTypeSlot?.source === source &&
    activeTypeSlot?.pokemon === pokemonIndex;

  const handleOutsideClick = useCallback(() => {
    if (isPickerActive) onActiveTypeSlotChange(null);
  }, [isPickerActive, onActiveTypeSlotChange]);

  useOutOfClick(wrapRef, handleOutsideClick);

  if (types.length === 0) return null;

  return (
    <div ref={wrapRef} className={cn(s.typesList, className)}>
      {types.map((typeKo, typeIndex) => {
        const isActive =
          activeTypeSlot?.source === source &&
          activeTypeSlot?.pokemon === pokemonIndex &&
          activeTypeSlot?.typeIndex === typeIndex;
        const showDropdown = isClient && isActive;
        const otherType = types.length > 1 ? types[1 - typeIndex] : null;

        return (
          <div key={`${typeKo}-${typeIndex}`} className={s.typePickerWrap}>
            <span
              className={cn(s.typeBadge, s.typeBadgeClickable)}
              style={{ background: TYPE_COLOR[typeKo] ?? '#999' }}
              onClick={(e) => {
                e.stopPropagation();
                onTypeSlotActivate(pokemonIndex, typeIndex, source);
              }}
              role="button"
              tabIndex={0}
              aria-label={`${typeKo} 타입 변경`}
              aria-expanded={isActive}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onTypeSlotActivate(pokemonIndex, typeIndex, source);
                }
              }}
            >
              {typeKo}
            </span>
            {showDropdown ? (
              <ul className={s.typePickerDropdown} role="listbox">
                {ALL_POKEMON_TYPES_KO.map((candidate) => {
                  const isCurrent = candidate === typeKo;
                  const isDuplicate = candidate === otherType;
                  return (
                    <li
                      key={candidate}
                      role="option"
                      aria-selected={isCurrent}
                      className={cn({
                        [s.typePickerOptionCurrent]: isCurrent,
                        [s.typePickerOptionDisabled]: isDuplicate,
                      })}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (isDuplicate) return;
                        onSelectType(pokemonIndex, typeIndex, candidate);
                      }}
                    >
                      <span
                        style={{
                          background: TYPE_COLOR[candidate] ?? '#999',
                        }}
                      >
                        {candidate}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
