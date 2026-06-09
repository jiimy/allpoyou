'use client';

import { useState } from 'react';
import {
  MAX_TEAMS,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';
import { isTeamShareable } from '@/utils/teamShare';
import type { TeamSaveStatus } from '@/hooks/useDebouncedTeamDbSync';

import s from '@/app/make-team/maekTeam.module.scss';

type TeamSelectorProps = {
  onSwitchTeam: (teamId: number) => void;
  onToggleShare?: (teamId: number) => void | Promise<void>;
  saveStatus?: TeamSaveStatus;
  shareError?: string | null;
  isLoggedIn?: boolean;
};

const SAVE_STATUS_LABEL: Record<TeamSaveStatus, string> = {
  idle: '',
  saving: '저장 중…',
  saved: '저장됨',
  error: '저장 실패',
};

export default function TeamSelector({
  onSwitchTeam,
  onToggleShare,
  saveStatus = 'idle',
  shareError = null,
  isLoggedIn = false,
}: TeamSelectorProps) {
  const activeTeamId = usePokemonTeamStore((state) => state.activeTeamId);
  const teams = usePokemonTeamStore((state) => state.teams);
  const setTeamName = usePokemonTeamStore((state) => state.setTeamName);
  const activeTeam = teams.find((team) => team.teamId === activeTeamId);
  const shareable = isTeamShareable(activeTeam);
  const isPublic = activeTeam?.isPublic ?? false;
  const [sharePending, setSharePending] = useState(false);

  const handleShareClick = async () => {
    if (!onToggleShare || sharePending) return;
    if (!isPublic && !shareable) return;

    setSharePending(true);
    try {
      await onToggleShare(activeTeamId);
    } finally {
      setSharePending(false);
    }
  };

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

      {isLoggedIn ? (
        <div className={s.teamMetaActions}>
          <button
            type="button"
            className={`${s.teamShareBtn} ${isPublic ? s.teamShareBtnActive : ''}`}
            disabled={sharePending || (!isPublic && !shareable)}
            onClick={handleShareClick}
            title={
              !isPublic && !shareable
                ? '6마리·도구·성격·기술4·노력치66을 모두 채워야 공유할 수 있습니다.'
                : undefined
            }
          >
            {sharePending ? '처리 중…' : isPublic ? '공유 중' : '공유'}
          </button>
          {saveStatus !== 'idle' ? (
            <span className={saveStatusClass(saveStatus)} aria-live="polite">
              {SAVE_STATUS_LABEL[saveStatus]}
            </span>
          ) : null}
        </div>
      ) : null}

      {shareError ? (
        <p className={s.teamShareError} role="alert">
          {shareError}
        </p>
      ) : null}
    </div>
  );
}

function saveStatusClass(status: TeamSaveStatus): string {
  if (status === 'error') return `${s.teamSaveStatus} ${s.teamSaveStatusError}`;
  if (status === 'saved') return `${s.teamSaveStatus} ${s.teamSaveStatusSaved}`;
  return s.teamSaveStatus;
}
