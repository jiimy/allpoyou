'use client';

import React from 'react';
import classNames from 'classnames';
import ModalFrame from '../ModalFrame';
import { ChildrenModalType } from '@/types/modal';
import NatureTable from '@/components/natureTable/NatureTable';
import { useModalShortcut } from '@/hooks/useModalShortcut';
import s from './natureTableModal.module.scss';

/** 성격표 모달 열기/닫기 단축키 */
export function useNatureTableModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useModalShortcut('modal-nature', setOnModal);
}

type NatureTableModalProps = ChildrenModalType & {
  /** 성격 셀 클릭 직후 호출됩니다. (예: 성격 모달 닫기) */
  onPick?: (nature: string) => void;
};

const NatureTableModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
  onPick,
}: NatureTableModalProps) => {
  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={dimClick || isDim}
      onClose
      dimClick={dimClick}
      className={classNames(s.modal, className)}
    >
      <NatureTable onPick={onPick} />
    </ModalFrame>
  );
};

export default NatureTableModal;
