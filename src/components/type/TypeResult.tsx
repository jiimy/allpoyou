import { typeChart } from '@/constants/pokemonType';
import { useGroupByValue } from '@/hooks/useGroupByValue';
import { useTypeCounter } from '@/hooks/useType';
import React, { useEffect, useState } from 'react';

type props = {
  select?: string[];
}

const TypeResult = ({ select = [] }: props) => {


  const result = useTypeCounter(select[0], select[1]);
  const data = useGroupByValue(result);


  console.log('result', select, data);

  return (
    <div>
      {data?.map((group, index) => {
        const [key, values] = Object.entries(group)[0];
        return (
          <div key={index}>
            <p>{key}</p>
            <div>
              {values.map((value, idx) => (
                <span key={idx}>{value}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TypeResult;