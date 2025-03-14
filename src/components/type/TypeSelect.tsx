'use client';
import { typeChart, typeTranslation } from '@/constants/pokemonType';
import React, { useState } from 'react';
import TypeResult from './TypeResult';
import s from './type.module.scss';
import classNames from 'classnames';

// 타입 선택과 결과를 같이 보여줌. 
const TypeSelect = () => {
  const [select, setSelect] = useState<string[]>([]);

  const onClick = (value: string) => {
    if (select.includes(value)) {
      setSelect(select.filter((item) => item !== value));
    } else if (select.length < 2) {
      setSelect([...select, value]);
    }
  }

  console.log('select', select);

  return (
    <>
      <div className={s.typeSelect}>
        {Object.keys(typeChart).map((type, index) => (
          <div key={index} onClick={() => onClick(type)}
            className={classNames([s.item], {
              [s.is_selected]: select.includes(type),
            })}
          >{typeTranslation[type]}
          </div>
        ))}

      </div>
      {select.length > 0 &&
        <TypeResult select={select} />
      }
    </>
  );
};

export default TypeSelect;