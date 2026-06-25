'use client';

import classNames from 'classnames';
import React from 'react';

import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { typeChart, typeTranslation } from '@/constants/pokemonType';

import s from './type.module.scss';

type TypePickerProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelection?: number;
};

const ALL_TYPES = Object.keys(typeChart);

const TypePicker = ({
  selected,
  onChange,
  maxSelection = 2,
}: TypePickerProps) => {
  const onClick = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
      return;
    }

    if (selected.length < maxSelection) {
      onChange([...selected, value]);
      return;
    }

    if (maxSelection === 1) {
      onChange([value]);
      return;
    }

    onChange([selected[1], value]);
  };

  return (
    <div className={s.typeSelect}>
      {ALL_TYPES.map((type) => {
        const label = typeTranslation[type];
        const isSelected = selected.includes(type);

        return (
          <button
            key={type}
            type="button"
            onClick={() => onClick(type)}
            className={classNames(s.item, { [s.is_selected]: isSelected })}
            style={
              isSelected
                ? { background: TYPE_COLOR[label] ?? '#999', borderColor: 'transparent', color: '#fff' }
                : undefined
            }
            aria-pressed={isSelected}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default TypePicker;
