'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutOfClick } from '@/hooks/useOutOfClick';
import { usePokemonTeamPersistHydrated } from '@/hooks/usePokemonTeamPersistHydrated';
import { fetchPokemonList, getCachedPokemonList } from '@/store/PokemonStore';
import TypeTableModal, {
  useTypeTableModalShortcut,
} from '@/components/portalModal/typeTableModal/TypeTableModal';
import TypeCalcModal, {
  useTypeCalcModalShortcut,
} from '@/components/portalModal/typeCalcModal/TypeCalcModal';
import TeamModal, {
  useTeamModalShortcut,
} from '@/components/portalModal/teamModal/TeamModal';
import NatureTableModal, {
  useNatureTableModalShortcut,
} from '@/components/portalModal/natureTableModal/NatureTableModal';
import { useItemPickStore } from '@/store/ItemPickStore';
import { usePokemonPickStore } from '@/store/PokemonPickStore';
import { useMovePickStore } from '@/store/MovePickStore';
import { useNaturePickStore } from '@/store/NaturePickStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import { useFloatingBtnStore } from '@/store/FloatingBtnStore';
import s from './floatingBtn.module.scss';
import Command from '../command/Command';

type FloatingMenuItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
};
const TYPE_CALC_ITEM: FloatingMenuItem = {
  id: 'type-calc',
  label: '타입 계산기',
};

const TYPE_TABLE_ITEM: FloatingMenuItem = {
  id: 'type-table',
  label: '타입 상성표',
};

const TEAM_ITEM: FloatingMenuItem = {
  id: 'team',
  label: '팀',
};

const NATURE_ITEM: FloatingMenuItem = {
  id: 'nature',
  label: '성격',
};

function isMakeTeamPath(pathname: string): boolean {
  return pathname === '/make-team' || pathname.startsWith('/make-team/');
}

const FloatingBtn = () => {
  usePokemonTeamPersistHydrated();

  useEffect(() => {
    if (getCachedPokemonList().length > 0) return;
    fetchPokemonList().catch(() => {});
  }, []);

  const pathname = usePathname();
  const isMakeTeamPage = isMakeTeamPath(pathname ?? '');

  const menuItems = useMemo(
    () =>
      isMakeTeamPage
        ? [TYPE_TABLE_ITEM, TYPE_CALC_ITEM]
        : [TYPE_TABLE_ITEM, TEAM_ITEM, NATURE_ITEM],
    [isMakeTeamPage],
  );

  const isOpen = useFloatingBtnStore((state) => state.isOpen);
  const setIsOpen = useFloatingBtnStore((state) => state.setIsOpen);
  const [typeTableModalOpen, setTypeTableModalOpen] = useState(false);
  const [typeCalcModalOpen, setTypeCalcModalOpen] = useState(false);
  const [natureTableModalOpen, setNatureTableModalOpen] = useState(false);
  const teamModalOpen = useTeamModalStore((state) => state.isOpen);
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);
  const clearPendingItem = useItemPickStore((state) => state.clearPendingItem);
  const clearPendingPokemon = usePokemonPickStore((state) => state.clearPendingPokemon);
  const clearPendingMove = useMovePickStore((state) => state.clearPendingMove);
  const clearPendingNature = useNaturePickStore((state) => state.clearPendingNature);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTeamModalOpenChange: React.Dispatch<
    React.SetStateAction<boolean>
  > = useCallback(
    (value) => {
      setTeamModalOpen((prev) => {
        const next = typeof value === 'function' ? value(prev) : value;
        if (!next) {
          clearPendingItem();
          clearPendingPokemon();
          clearPendingMove();
          clearPendingNature();
        }
        return next;
      });
    },
    [
      setTeamModalOpen,
      clearPendingItem,
      clearPendingPokemon,
      clearPendingMove,
      clearPendingNature,
    ],
  );

  useTypeTableModalShortcut(setTypeTableModalOpen);
  useTypeCalcModalShortcut(setTypeCalcModalOpen);
  useTeamModalShortcut(handleTeamModalOpenChange);
  useNatureTableModalShortcut(setNatureTableModalOpen);

  const handleOutOfClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useOutOfClick(containerRef, handleOutOfClick);

  const handleItemClick = (item: FloatingMenuItem) => {
    if (item.id === 'type-table') {
      setTypeTableModalOpen(true);
    }
    if (item.id === 'type-calc') {
      setTypeCalcModalOpen(true);
    }
    if (item.id === 'team') {
      handleTeamModalOpenChange(true);
    }
    if (item.id === 'nature') {
      setNatureTableModalOpen(true);
    }
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <>
      {typeTableModalOpen && (
        <TypeTableModal setOnModal={setTypeTableModalOpen} dimClick />
      )}
      {typeCalcModalOpen && (
        <TypeCalcModal setOnModal={setTypeCalcModalOpen} dimClick />
      )}
      {teamModalOpen && (
        <TeamModal setOnModal={handleTeamModalOpenChange} dimClick />
      )}
      {natureTableModalOpen && (
        <NatureTableModal
          setOnModal={setNatureTableModalOpen}
          dimClick
          onPick={() => setNatureTableModalOpen(false)}
        />
      )}
      <div ref={containerRef} className={s.container}>
        <ul className={`${s.menuList} ${isOpen ? s.menuListOpen : ''}`}>
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={s.menuItem}
              style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className={s.menuBtn}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className={s.menuBtn}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                  {item.id === 'type-calc' && <Command command="+V" />}
                  {item.id === 'type-table' && <Command command="+F" />}
                  {item.id === 'team' && <Command command="+D" />}
                  {item.id === 'nature' && <Command command="+C" />}
                </button>
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`${s.floatingBtn} ${isOpen ? s.floatingBtnOpen : ''}`}
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={s.icon} aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

export default FloatingBtn;
