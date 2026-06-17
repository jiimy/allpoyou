'use client';

import { useEffect, useState } from 'react';

import { useFloatingBtnStore } from '@/store/FloatingBtnStore';

import s from './topbutton.module.scss';

const SCROLL_THRESHOLD = 50;

const TopButton = () => {
  const [isScrollPastThreshold, setIsScrollPastThreshold] = useState(false);
  const floatingMenuOpen = useFloatingBtnStore((state) => state.isOpen);
  const visible = isScrollPastThreshold && !floatingMenuOpen;

  useEffect(() => {
    const onScroll = () => {
      setIsScrollPastThreshold(window.scrollY >= SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className={s.button}
      aria-label="맨 위로"
      onClick={handleClick}
    >
      <span className={s.icon} aria-hidden="true" />
    </button>
  );
};

export default TopButton;
