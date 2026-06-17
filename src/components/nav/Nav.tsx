'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Command from '../command/Command';
import { useRememberLastPage } from './useRememberLastPage';
import { useNavShortcuts } from './useNavShortcuts';
import s from './nav.module.scss';

type NavItem = {
  href: string;
  label: string;
  command?: string;
  exact?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: '메인', exact: true },
  { href: '/pokedex', label: '도감', command: '+Q' },
  { href: '/abilities', label: '특성', command: '+W' },
  { href: '/items', label: '도구', command: '+E' },
  { href: '/moves', label: '기술', command: '+R' },
  { href: '/make-team', label: '팀만들기', command: '+T' },
  { href: '/my-info', label: '내정보' },
];

function isNavActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const Nav = () => {
  useNavShortcuts();
  const pathname = usePathname() ?? '';
  const { enabled: rememberLastPage, setEnabled: setRememberLastPage } =
    useRememberLastPage(pathname);
  const [menuSession, setMenuSession] = useState<{ pathname: string } | null>(
    null,
  );
  const menuOpen =
    menuSession !== null && menuSession.pathname === pathname;

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuSession(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div className={`${s.nav} ${menuOpen ? s.navOpen : ''}`}>
        <button
          type="button"
          className={s.menuToggle}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() =>
            setMenuSession((prev) =>
              prev && prev.pathname === pathname ? null : { pathname },
            )
          }
        >
          <span className={s.menuToggleBar} />
          <span className={s.menuToggleBar} />
          <span className={s.menuToggleBar} />
        </button>

        {menuOpen ? (
          <button
            type="button"
            className={s.backdrop}
            aria-label="메뉴 닫기"
            onClick={() => setMenuSession(null)}
          />
        ) : null}

        <ul id="nav-menu" className={s.menuList}>
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href, item.exact);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${s.link} ${active ? s.linkActive : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuSession(null)}
                >
                  {item.label}
                  {item.command ? <Command command={item.command} /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
        <label className={s.rememberPage}>
          <input
            type="checkbox"
            className={s.rememberPageInput}
            checked={rememberLastPage}
            onChange={(event) => setRememberLastPage(event.target.checked)}
          />
          <span className={s.rememberPageLabel}>마지막 페이지 기억</span>
        </label>
      </div>
    </>
  );
};

export default Nav;
