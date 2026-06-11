'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Command from '../command/Command';
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

  return (
    <div className={s.nav}>
      <ul>
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href, item.exact);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${s.link} ${active ? s.linkActive : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
                {item.command ? <Command command={item.command} /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Nav;
