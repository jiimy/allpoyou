'use client';

import Link from 'next/link';
import Command from '../command/Command';
import { useNavShortcuts } from './useNavShortcuts';
import s from './nav.module.scss';

const Nav = () => {
  useNavShortcuts();

  return (
    <div className={s.nav}>
      <ul>
        <li>
          <Link href="/">메인</Link>
        </li>
        <li>
          <Link href="/pokedex">
            도감 <Command command="+Q" />
          </Link>
        </li>
        <li>
          <Link href="/abilities">
            특성 <Command command="+W" />
          </Link>
        </li>
        <li>
          <Link href="/items">
            도구 <Command command="+E" />
          </Link>
        </li>
        <li>
          <Link href="/moves">
            기술 <Command command="+R" />
          </Link>
        </li>
        <li>
          <Link href="/make-team">
            팀만들기 <Command command="+T" />
          </Link>
        </li>
        <li>
          <Link href="/my-info">내정보</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
