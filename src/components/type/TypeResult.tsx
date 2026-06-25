'use client';

import React, { useMemo } from 'react';

import { ALL_POKEMON_TYPES_KO } from '@/constants/pokemonTypeColor';
import { typeColor } from '@/constants/pokemonType';
import { useGroupByValue } from '@/hooks/useGroupByValue';
import {
  getAttackTypeEffectiveness,
  getDefenseTypeEffectiveness,
} from '@/hooks/useType';

import s from './type.module.scss';

type TypeResultProps = {
  mode: 'attack' | 'defense';
  select?: string[];
};

const DEFAULT_RESULT = Object.fromEntries(
  ALL_POKEMON_TYPES_KO.map((type) => [type, 1]),
);

const TypeResult = ({ mode, select = [] }: TypeResultProps) => {
  const result = useMemo(() => {
    if (select.length === 0 || !select[0]) {
      return DEFAULT_RESULT;
    }
    if (mode === 'attack') {
      return getAttackTypeEffectiveness(select[0]);
    }
    return getDefenseTypeEffectiveness(select[0], select[1]);
  }, [mode, select]);

  const data = useGroupByValue(result);

  return (
    <div className={s.type_result}>
      {data.map((group, index) => {
        const [key, values] = Object.entries(group)[0];
        return (
          <div key={index}>
            <p>{key}</p>
            <div className={s.type_area}>
              {values.map((value) => (
                <span
                  key={value}
                  style={{ background: typeColor[value] ?? '#999' }}
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TypeResult;
