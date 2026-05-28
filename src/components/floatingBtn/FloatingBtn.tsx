'use client';

import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import { useOutOfClick } from '@/hooks/useOutOfClick';
import TypeTableModal from '@/components/portalModal/typeTableModal/TypeTableModal';
import s from './floatingBtn.module.scss';

type FloatingMenuItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
};

const MENU_ITEMS: [FloatingMenuItem, FloatingMenuItem] = [
  {
    id: 'type-table',
    label: '타입 상성표',
  },
  {
    id: 'book',
    label: '도감',
    href: '/book',
  },
];

const FloatingBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeTableModalOpen, setTypeTableModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOutOfClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOutOfClick(containerRef, handleOutOfClick);

  const handleItemClick = (item: FloatingMenuItem) => {
    if (item.id === 'type-table') {
      setTypeTableModalOpen(true);
    }
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <>
      {typeTableModalOpen && (
        <TypeTableModal
          setOnModal={setTypeTableModalOpen}
          pokemons={[]}
          dimClick
        />
      )}

      <div ref={containerRef} className={s.container}>
        <ul className={`${s.menuList} ${isOpen ? s.menuListOpen : ''}`}>
          {MENU_ITEMS.map((item, index) => (
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
