'use client';

import React from 'react';
import s from './pokemonTooltip.module.scss';

type PokemonTooltipProps = {
  onViewInfo: (event: React.MouseEvent) => void;
  onAddToTeam: (event: React.MouseEvent) => void;
  viewInfoLabel?: string;
  addToTeamLabel?: string;
  viewInfoDisabled?: boolean;
};

const PokemonTooltip = ({
  onViewInfo,
  onAddToTeam,
  viewInfoLabel = '정보 보기',
  addToTeamLabel = '팀에 추가',
  viewInfoDisabled = false,
}: PokemonTooltipProps) => {
  return (
    <div className={s.tooltip} onClick={(e) => e.stopPropagation()}>
      <ul>
        <li>
          <button
            type="button"
            className={s.tooltipBtn}
            disabled={viewInfoDisabled}
            aria-disabled={viewInfoDisabled}
            onClick={(event) => {
              if (viewInfoDisabled) {
                event.preventDefault();
                event.stopPropagation();
                return;
              }
              onViewInfo(event);
            }}
          >
            {viewInfoLabel}
          </button>
        </li>
        <li>
          <button type="button" className={s.tooltipBtn} onClick={onAddToTeam}>
            {addToTeamLabel}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PokemonTooltip;
