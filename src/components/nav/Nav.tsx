import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/book">도감</Link>
          <Link href="/char">특성</Link>
          <Link href="/skills">기술</Link>
          <Link href="/person">성격</Link>
          <Link href="/items">도구</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;