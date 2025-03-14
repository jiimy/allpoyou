import { typeChart, typeColor } from '@/constants/pokemonType';
import { useGroupByValue } from '@/hooks/useGroupByValue';
import { useTypeCounter } from '@/hooks/useType';
import React, { useEffect, useState } from 'react';
import s from './type.module.scss';

type props = {
  select?: string[];
}

const TypeResult = ({ select = [] }: props) => {


  const result = useTypeCounter(select[0], select[1]);
  const data = useGroupByValue(result);


  // console.log('result', result, data);

  console.log('dd :', typeColor['노말'] )

  return (
    <div className={s.type_result}>
      {data?.map((group, index) => {
        const [key, values] = Object.entries(group)[0];
        return (
          <div key={index}>
            <p>{key}</p>
            <div className={s.type_area}>
              {values.map((value, idx) => (
                <>
                  <span key={idx} style={{ background: typeColor[value] }}>{value}</span>
                </>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TypeResult;