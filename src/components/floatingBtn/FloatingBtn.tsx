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
import TeamModal from '@/components/portalModal/teamModal/TeamModal';
import s from './floatingBtn.module.scss';
import Command from '../command/Command';

type FloatingMenuItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
};

const TYPE_TABLE_ITEM: FloatingMenuItem = {
  id: 'type-table',
  label: '타입 상성표',
};

const TEAM_ITEM: FloatingMenuItem = {
  id: 'team',
  label: '팀',
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
    () => (isMakeTeamPage ? [TYPE_TABLE_ITEM] : [TYPE_TABLE_ITEM, TEAM_ITEM]),
    [isMakeTeamPage],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [typeTableModalOpen, setTypeTableModalOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useTypeTableModalShortcut(setTypeTableModalOpen);

  const handleOutOfClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOutOfClick(containerRef, handleOutOfClick);

  const handleItemClick = (item: FloatingMenuItem) => {
    if (item.id === 'type-table') {
      setTypeTableModalOpen(true);
    }
    if (item.id === 'team') {
      setTeamModalOpen(true);
    }
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <>
      {typeTableModalOpen && (
        <TypeTableModal setOnModal={setTypeTableModalOpen} dimClick />
      )}
      {teamModalOpen && (
        <TeamModal setOnModal={setTeamModalOpen} dimClick />
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
                  {item.id === 'type-table' && <Command command="Shift+F" />}
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
