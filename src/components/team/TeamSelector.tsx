'use client';

import {
  MAX_TEAMS,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';

import s from '@/app/make-team/maekTeam.module.scss';

type TeamSelectorProps = {
  onSwitchTeam: (teamId: number) => void;
};

export default function TeamSelector({ onSwitchTeam }: TeamSelectorProps) {
  const activeTeamId = usePokemonTeamStore((state) => state.activeTeamId);
  const teams = usePokemonTeamStore((state) => state.teams);
  const setTeamName = usePokemonTeamStore((state) => state.setTeamName);
  const activeTeam = teams.find((team) => team.teamId === activeTeamId);

  return (
    <div className={s.teamSelector}>
      <div className={s.teamTabs} role="tablist" aria-label="팀 선택">
        {Array.from({ length: MAX_TEAMS }, (_, index) => index + 1).map(
          (teamId) => (
            <button
              key={teamId}
              type="button"
              role="tab"
              aria-selected={activeTeamId === teamId}
              className={`${s.teamTab} ${activeTeamId === teamId ? s.teamTabActive : ''}`}
              onClick={() => onSwitchTeam(teamId)}
            >
              {teamId}
            </button>
          ),
        )}
      </div>

      <label className={s.teamNameField}>
        <span className={s.teamNameLabel}>팀 이름</span>
        <input
          type="text"
          className={s.teamNameInput}
          value={activeTeam?.teamName ?? ''}
          onChange={(e) => setTeamName(activeTeamId, e.target.value)}
          placeholder={`팀 ${activeTeamId}`}
          maxLength={40}
        />
      </label>
    </div>
  );
}
