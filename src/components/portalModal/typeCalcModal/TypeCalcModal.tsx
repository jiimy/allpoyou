'use client';

import classNames from 'classnames';
import React, { useEffect } from 'react';

import ModalFrame from '@/components/portalModal/ModalFrame';
import TypePicker from '@/components/type/TypePicker';
import TypeResult from '@/components/type/TypeResult';
import { useTypeCalcStore } from '@/store/TypeCalcStore';
import type { ChildrenModalType } from '@/types/modal';

import s from './typeCalcModal.module.scss';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

/** Shift+V로 타입 계산기 모달 열기/닫기 */
export function useTypeCalcModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key !== 'v' && e.key !== 'V') return;
      if (isEditableTarget(e.target)) return;

      e.preventDefault();
      setOnModal((open) => !open);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [setOnModal]);
}

type TypeCalcModalProps = ChildrenModalType;

const TypeCalcModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
}: TypeCalcModalProps) => {
  const mode = useTypeCalcStore((state) => state.mode);
  const attackSelected = useTypeCalcStore((state) => state.attackSelected);
  const defenseSelected = useTypeCalcStore((state) => state.defenseSelected);
  const setMode = useTypeCalcStore((state) => state.setMode);
  const setAttackSelected = useTypeCalcStore((state) => state.setAttackSelected);
  const setDefenseSelected = useTypeCalcStore((state) => state.setDefenseSelected);

  const selected = mode === 'attack' ? attackSelected : defenseSelected;
  const setSelected = mode === 'attack' ? setAttackSelected : setDefenseSelected;
  const maxSelection = mode === 'attack' ? 1 : 2;

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={dimClick || isDim}
      onClose
      dimClick={dimClick}
      className={classNames(s.modal, className)}
    >
      <div className={s.content}>
        <h2 className={s.title}>타입 계산기</h2>

        <div className={s.modeTabs} role="tablist" aria-label="계산 모드">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'attack'}
            className={classNames(s.modeTab, {
              [s.modeTabActive]: mode === 'attack',
            })}
            onClick={() => setMode('attack')}
          >
            공격타입
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'defense'}
            className={classNames(s.modeTab, {
              [s.modeTabActive]: mode === 'defense',
            })}
            onClick={() => setMode('defense')}
          >
            방어타입
          </button>
        </div>

        <div className={s.typeWrap}>
          <div className={s.pickerPanel}>
            <p className={s.panelLabel}>타입 선택</p>
            <TypePicker
              selected={selected}
              onChange={setSelected}
              maxSelection={maxSelection}
              className={s.pickerGrid}
            />
          </div>
          <div className={s.resultPanel}>
            {/* <p className={s.panelLabel}>결과</p> */}
            <TypeResult
              mode={mode}
              select={selected}
              className={s.resultContent}
              typeAreaClassName={s.resultGrid}
            />
          </div>
        </div>
      </div>
    </ModalFrame>
  );
};

export default TypeCalcModal;
