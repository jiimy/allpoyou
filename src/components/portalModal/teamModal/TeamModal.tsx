'use client';

import React from 'react';
import classNames from 'classnames';
import ModalFrame from '../ModalFrame';
import TeamEditor from '@/components/team/TeamEditor';
import type { ExportModalType } from '@/types/modal';
import { useModalShortcut } from '@/hooks/useModalShortcut';
import s from './teamModal.module.scss';

/** 팀 모달 열기/닫기 단축키 */
export function useTeamModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
  enabled = true,
) {
  useModalShortcut('modal-team', setOnModal, enabled);
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
