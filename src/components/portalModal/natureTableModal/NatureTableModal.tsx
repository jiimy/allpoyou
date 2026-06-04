import React, { useEffect } from 'react'
import ModalFrame from '../ModalFrame'
import { ChildrenModalType } from '@/types/modal'
import NatureTable from '@/components/natureTable/NatureTable'
import s from './natureTableModal.module.scss'
import classNames from 'classnames'

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  return target.isContentEditable
}

/** Shift+C로 성격표 모달 열기/닫기 (모달 마운트 여부와 무관하게 동작) */
export function useNatureTableModalShortcut(
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return
      if (e.key !== 'c' && e.key !== 'C') return
      if (isEditableTarget(e.target)) return

      e.preventDefault()
      setOnModal((open) => !open)
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [setOnModal])
}

type NatureTableModalProps = ChildrenModalType & {
  /** 성격 셀 클릭 직후 호출됩니다. (예: 성격 모달 닫기) */
  onPick?: (nature: string) => void
}

const NatureTableModal = ({ setOnModal, dimClick, isDim = true, className, onPick }: NatureTableModalProps) => {
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
  )
}

export default NatureTableModal