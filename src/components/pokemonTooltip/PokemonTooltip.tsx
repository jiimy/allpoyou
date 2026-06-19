import React from 'react';
import s from './pokemonTooltip.module.scss';

const PokemonTooltip = () => {
  return (
    <div className={s.tooltip}>
      <ul>
        <li>기술 보기</li>
        <li>팀에 추가</li>
      </ul>
    </div>
  );
};

export default PokemonTooltip;