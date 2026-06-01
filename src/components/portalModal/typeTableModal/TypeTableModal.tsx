'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames';
import ModalFrame from '../ModalFrame';
import { ChildrenModalType } from '@/types/modal';
import TypeTable, { TypeTablePokemon } from '@/components/typeTable/TypeTable';
import { useActiveTeamTypeTablePokemons } from '@/hooks/useActiveTeamTypeTablePokemons';
import s from './typeTableModal.module.scss';

type TypeTableModalProps = ChildrenModalType & {
  /** 미전달 시 활성 팀(persist) 기준으로 표시 */
  pokemons?: (TypeTablePokemon | null)[];
};

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

/** Shift+F로 타입 상성표 모달 열기/닫기 (모달 마운트 여부와 무관하게 동작) */
export function useTypeTableModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key !== 'f' && e.key !== 'F') return;
      if (isEditableTarget(e.target)) return;

      e.preventDefault();
      setOnModal((open) => !open);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [setOnModal]);
}

const TypeTableModal = ({
  setOnModal,
  pokemons,
  dimClick,
  isDim = true,
  className,
}: TypeTableModalProps) => {
  const { pokemons: activeTeamPokemons, isReady } =
    useActiveTeamTypeTablePokemons();
  const useStoreData = pokemons === undefined;
  const resolvedPokemons = useStoreData ? activeTeamPokemons : pokemons;
  const showLoading = useStoreData && !isReady;

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={dimClick || isDim}
      onClose
      dimClick={dimClick}
      className={classNames(s.type_table_modal, className)}
    >
      {showLoading ? (
        <p className={s.loading}>팀 정보를 불러오는 중…</p>
      ) : (
        <TypeTable pokemons={resolvedPokemons ?? []} />
      )}
    </ModalFrame>
  );
};

export default TypeTableModal;
