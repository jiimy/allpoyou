'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames';
import ModalFrame from '../ModalFrame';
import TeamEditor from '@/components/team/TeamEditor';
import type { ExportModalType } from '@/types/modal';
import s from './teamModal.module.scss';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

/** Shift+D로 팀 모달 열기/닫기 (모달 마운트 여부와 무관하게 동작) */
export function useTeamModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key !== 'd' && e.key !== 'D') return;
      if (isEditableTarget(e.target)) return;

      e.preventDefault();
      setOnModal((open) => !open);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [setOnModal]);
}

const TeamModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
}: ExportModalType) => {
  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={dimClick ?? isDim}
      onClose
      dimClick={dimClick}
      className={classNames(s.team_modal, className)}
    >
      <h2 className={s.team_modal_title}>팀</h2>
      <TeamEditor />
    </ModalFrame>
  );
};

export default TeamModal;
