import Link from 'next/link';
import React from 'react';
import s from './nav.module.scss';

const Nav = () => {
  return (
    <div className={s.nav}>
      <ul>
        <li>
          <Link href="/">메인</Link>
        </li>
        <li>
          <Link href="/pokedex">도감</Link>
        </li>
        <li>
          <Link href="/abilities">특성</Link>
        </li>
        <li>
          <Link href="/items">도구</Link>
        </li>
        <li>
          <Link href="/person">성격</Link>
        </li>
        <li>
          <Link href="/moves">기술</Link>
        </li>
        <li>
          <Link href="/make-team">팀만들기</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;