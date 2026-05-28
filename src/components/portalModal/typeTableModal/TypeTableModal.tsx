import React from 'react'
import ModalFrame from '../ModalFrame'
import { ChildrenModalType } from '@/types/modal'
import TypeTable, { TypeTablePokemon } from '@/components/typeTable/TypeTable'
import classNames from 'classnames'
import s from './typeTableModal.module.scss';

const TypeTableModal = ({ setOnModal, pokemons, dimClick, isDim = true, className }: ChildrenModalType & { pokemons: (TypeTablePokemon | null)[] }) => {
  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={dimClick || isDim}
      onClose
      dimClick={dimClick}
      className={classNames(s.type_table_modal, className)}
    >
      <TypeTable pokemons={pokemons || []} />
    </ModalFrame>
  )
}

export default TypeTableModal