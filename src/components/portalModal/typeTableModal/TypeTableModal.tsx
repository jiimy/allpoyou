'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import ModalFrame from '../ModalFrame';
import { ChildrenModalType } from '@/types/modal';
import TypeTable, {
  TypeTableMode,
  TypeTablePokemon,
} from '@/components/typeTable/TypeTable';
import { useActiveTeamTypeTablePokemons } from '@/hooks/useActiveTeamTypeTablePokemons';
import { useModalShortcut } from '@/hooks/useModalShortcut';
import s from './typeTableModal.module.scss';

type TypeTableModalProps = ChildrenModalType & {
  /** 미전달 시 활성 팀(persist) 기준으로 표시 */
  pokemons?: (TypeTablePokemon | null)[];
};

/** 타입 상성표 모달 열기/닫기 단축키 */
export function useTypeTableModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useModalShortcut('modal-type-table', setOnModal);
}

const TABS: { id: TypeTableMode; label: string }[] = [
  { id: 'attack', label: '공격할 때' },
  { id: 'defense', label: '맞을 때' },
];

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
  const [mode, setMode] = useState<TypeTableMode>('defense');

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={dimClick || isDim}
      onClose
      dimClick={dimClick}
      className={classNames(s.type_table_modal, className)}
    >
      <div className={s.content}>
        <h2 className={s.title}>타입 상성표</h2>

        <div className={s.modeTabs} role="tablist" aria-label="상성 방향">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={mode === tab.id}
              className={classNames(s.modeTab, {
                [s.modeTabActive]: mode === tab.id,
              })}
              onClick={() => setMode(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {showLoading ? (
          <p className={s.loading}>팀 정보를 불러오는 중…</p>
        ) : (
          <TypeTable pokemons={resolvedPokemons ?? []} mode={mode} />
        )}
      </div>
    </ModalFrame>
  );
};

export default TypeTableModal;
