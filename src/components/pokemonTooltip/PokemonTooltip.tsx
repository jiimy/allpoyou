'use client';

import React from 'react';
import s from './pokemonTooltip.module.scss';

type PokemonTooltipProps = {
  onViewInfo: (event: React.MouseEvent) => void;
  onAddToTeam: (event: React.MouseEvent) => void;
};

const PokemonTooltip = ({ onViewInfo, onAddToTeam }: PokemonTooltipProps) => {
  return (
    <div className={s.tooltip} onClick={(e) => e.stopPropagation()}>
      <ul>
        <li>
          <button type="button" className={s.tooltipBtn} onClick={onViewInfo}>
            정보 보기
          </button>
        </li>
        <li>
          <button type="button" className={s.tooltipBtn} onClick={onAddToTeam}>
            팀에 추가
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PokemonTooltip;
