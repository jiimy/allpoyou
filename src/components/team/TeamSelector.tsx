'use client';

import { useState } from 'react';
import {
  MAX_TEAMS,
  usePokemonTeamStore,
} from '@/store/PokemonTeamStore';
import { isTeamAlreadyPublished, isTeamPublishable, isTeamShareable } from '@/utils/teamShare';
import type { TeamSaveStatus } from '@/hooks/useDebouncedTeamDbSync';
import s from '@/app/make-team/maekTeam.module.scss';
import { useMobile } from '@/hooks/useMobile';

type TeamSelectorProps = {
  onSwitchTeam: (teamId: number) => void;
  onPublishTeam?: (teamId: number) => void | Promise<void>;
  saveStatus?: TeamSaveStatus;
  // saveCountdownSec?: number | null;
  publishError?: string | null;
  isLoggedIn?: boolean;
  publishedPokemonDataList?: unknown[];
};

const SAVE_STATUS_LABEL = {
  saving: '저장 중…',
  error: '저장 실패',
  saved: '저장 완료',
} as const satisfies Partial<Record<TeamSaveStatus, string>>;

export default function TeamSelector({
  onSwitchTeam,
  onPublishTeam,
  saveStatus = 'idle',
  // saveCountdownSec = null,
  publishError = null,
  isLoggedIn = false,
  publishedPokemonDataList = [],
}: TeamSelectorProps) {
  const activeTeamId = usePokemonTeamStore((state) => state.activeTeamId);
  const teams = usePokemonTeamStore((state) => state.teams);
  const setTeamName = usePokemonTeamStore((state) => state.setTeamName);
  const activeTeam = teams.find((team) => team.teamId === activeTeamId);
  const shareable = isTeamShareable(activeTeam);
  const alreadyPublished = isTeamAlreadyPublished(
    activeTeam,
    publishedPokemonDataList,
  );
  const publishable = isTeamPublishable(activeTeam, publishedPokemonDataList);
  const [publishPending, setPublishPending] = useState(false);
  const showPublishButton = isLoggedIn;
  // const showCountdown =
  //   saveCountdownSec != null &&
  //   saveCountdownSec > 0 &&
  //   saveStatus !== 'saving' &&
  //   saveStatus !== 'saved';
  const showSaveIndicator =
    saveStatus === 'saving' ||
    saveStatus === 'saved' ||
    saveStatus === 'error';
    // || showCountdown;
  const isMobile = useMobile();

  const handlePublishClick = async () => {
    if (!onPublishTeam || publishPending || !publishable) return;
    setPublishPending(true);
    try {
      await onPublishTeam(activeTeamId);
    } finally {
      setPublishPending(false);
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

      {isMobile() && isLoggedIn && (showPublishButton || showSaveIndicator) ? (
        <div className={s.teamMetaActions}>
          {showPublishButton ? (
            <button
              type="button"
              className={s.teamShareBtn}
              disabled={publishPending || !publishable}
              onClick={handlePublishClick}
              title={
                !shareable
                  ? '팀 이름과 6마리·도구·성격·기술4·노력치66을 모두 채워야 공개할 수 있습니다.'
                  : alreadyPublished
                    ? '이미 동일한 포켓몬 구성으로 공개한 팀이 있습니다. 포켓몬 정보를 수정하면 다시 공개할 수 있습니다.'
                    : '현재 팀 구성으로 다시 공개합니다.'
              }
            >
              {publishPending ? '공개 중…' : '공개'}
            </button>
          ) : null}
          {/* {showCountdown ? (
            <span className={s.teamSaveStatus} aria-live="polite">
              자동저장 남은 시간 {saveCountdownSec}초..
            </span>
          ) : null} */}
          {saveStatus === 'saving' ||
            saveStatus === 'error' ||
            saveStatus === 'saved' ? (
            <span className={saveStatusClass(saveStatus)} aria-live="polite">
              {SAVE_STATUS_LABEL[saveStatus]}
            </span>
          ) : null}
        </div>
      ) : null}

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

      {isLoggedIn && !isMobile() && (showPublishButton || showSaveIndicator) ? (
        <div className={s.teamMetaActions}>
          {showPublishButton ? (
            <button
              type="button"
              className={s.teamShareBtn}
              disabled={publishPending || !publishable}
              onClick={handlePublishClick}
              title={
                !shareable
                  ? '팀 이름과 6마리·도구·성격·기술4·노력치66을 모두 채워야 공개할 수 있습니다.'
                  : alreadyPublished
                    ? '이미 동일한 포켓몬 구성으로 공개한 팀이 있습니다. 포켓몬 정보를 수정하면 다시 공개할 수 있습니다.'
                    : '현재 팀 구성으로 다시 공개합니다.'
              }
            >
              {publishPending ? '공개 중…' : '공개'}
            </button>
          ) : null}
          {/* {showCountdown ? (
            <span className={s.teamSaveStatus} aria-live="polite">
              자동저장 남은 시간 {saveCountdownSec}초..
            </span>
          ) : null} */}
          {saveStatus === 'saving' ||
          saveStatus === 'error' ||
          saveStatus === 'saved' ? (
            <span className={saveStatusClass(saveStatus)} aria-live="polite">
              {SAVE_STATUS_LABEL[saveStatus]}
            </span>
          ) : null}
        </div>
      ) : null}

      {publishError ? (
        <p className={s.teamShareError} role="alert">
          {publishError}
        </p>
      ) : null}
    </div>
  );
}

function saveStatusClass(
  status: 'saving' | 'error' | 'saved',
): string {
  if (status === 'error') return `${s.teamSaveStatus} ${s.teamSaveStatusError}`;
  if (status === 'saved') return `${s.teamSaveStatus} ${s.teamSaveStatusSaved}`;
  return s.teamSaveStatus;
}