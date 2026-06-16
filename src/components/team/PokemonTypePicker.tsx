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

function typesEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((type, index) => type === b[index]);
}

type TypePickerDropdownProps = {
  pokemonIndex: number;
  source: TypePickerSource;
  typeIndex: number;
  typeKo: string;
  types: string[];
  originalTypes: string[] | null;
  isAddMode: boolean;
  onSelectType: (pokemonIndex: number, typeIndex: number, newType: string) => void;
  onAddType: (pokemonIndex: number, newType: string) => void;
  onRemoveType: (pokemonIndex: number, typeIndex: number) => void;
  onStartAddType: (pokemonIndex: number, source: TypePickerSource) => void;
  onCancelTypes: (pokemonIndex: number) => void;
};

function TypePickerDropdown({
  pokemonIndex,
  source,
  typeIndex,
  typeKo,
  types,
  originalTypes,
  isAddMode,
  onSelectType,
  onAddType,
  onRemoveType,
  onStartAddType,
  onCancelTypes,
}: TypePickerDropdownProps) {
  const otherType = types.length > 1 ? types[1 - typeIndex] : null;
  const canRemove = types.length === 2 && !isAddMode;
  const canAdd = types.length === 1 && !isAddMode;
  const hasTypeChanges =
    originalTypes != null && !typesEqual(types, originalTypes);

  return (
    <ul className={s.typePickerDropdown} role="listbox">
      {ALL_POKEMON_TYPES_KO.map((candidate) => {
        const isCurrent = !isAddMode && candidate === typeKo;
        const isDuplicate =
          candidate === otherType || (isAddMode && candidate === types[0]);
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
              if (isAddMode) {
                onAddType(pokemonIndex, candidate);
                return;
              }
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
      <li className={s.typePickerActionRow}>
        <button
          type="button"
          className={cn(s.typePickerActionBtn, {
            [s.typePickerActionBtnDisabled]: !canRemove,
          })}
          disabled={!canRemove}
          onMouseDown={(e) => {
            e.preventDefault();
            if (!canRemove) return;
            onRemoveType(pokemonIndex, typeIndex);
          }}
        >
          없음
        </button>
        <button
          type="button"
          className={cn(s.typePickerActionBtn, {
            [s.typePickerActionBtnDisabled]: !canAdd,
          })}
          disabled={!canAdd}
          onMouseDown={(e) => {
            e.preventDefault();
            if (!canAdd) return;
            onStartAddType(pokemonIndex, source);
          }}
        >
          추가
        </button>
        <button
          type="button"
          className={cn(s.typePickerActionBtn, {
            [s.typePickerActionBtnDisabled]: !hasTypeChanges,
          })}
          disabled={!hasTypeChanges}
          onMouseDown={(e) => {
            e.preventDefault();
            if (!hasTypeChanges) return;
            onCancelTypes(pokemonIndex);
          }}
        >
          취소
        </button>
      </li>
    </ul>
  );
}

export type PokemonTypePickerProps = {
  source: TypePickerSource;
  pokemonIndex: number;
  types: string[];
  originalTypes: string[] | null;
  activeTypeSlot: ActiveTypeSlot;
  isClient: boolean;
  onTypeSlotActivate: (
    pokemonIndex: number,
    typeIndex: number,
    source: TypePickerSource,
  ) => void;
  onSelectType: (pokemonIndex: number, typeIndex: number, newType: string) => void;
  onRemoveType: (pokemonIndex: number, typeIndex: number) => void;
  onStartAddType: (pokemonIndex: number, source: TypePickerSource) => void;
  onAddType: (pokemonIndex: number, newType: string) => void;
  onCancelTypes: (pokemonIndex: number) => void;
  onActiveTypeSlotChange: (slot: ActiveTypeSlot) => void;
  className?: string;
};

export function PokemonTypePicker({
  source,
  pokemonIndex,
  types,
  originalTypes,
  activeTypeSlot,
  isClient,
  onTypeSlotActivate,
  onSelectType,
  onRemoveType,
  onStartAddType,
  onAddType,
  onCancelTypes,
  onActiveTypeSlotChange,
  className,
}: PokemonTypePickerProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isPickerActive =
    activeTypeSlot?.source === source &&
    activeTypeSlot?.pokemon === pokemonIndex;
  const isAddMode =
    isPickerActive && activeTypeSlot?.mode === 'add';

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
          (activeTypeSlot.mode === 'add'
            ? typeIndex === 0
            : activeTypeSlot.typeIndex === typeIndex);
        const showDropdown = isClient && isActive;

        return (
          <div key={`${typeKo}-${typeIndex}`} className={s.typePickerWrap}>
            <span
              className={cn(s.typeBadge, s.typeBadgeClickable, {
                [s.typeBadgeAddMode]: isAddMode && typeIndex === 0,
              })}
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
              <TypePickerDropdown
                pokemonIndex={pokemonIndex}
                source={source}
                typeIndex={typeIndex}
                typeKo={typeKo}
                types={types}
                originalTypes={originalTypes}
                isAddMode={isAddMode}
                onSelectType={onSelectType}
                onAddType={onAddType}
                onRemoveType={onRemoveType}
                onStartAddType={onStartAddType}
                onCancelTypes={onCancelTypes}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
