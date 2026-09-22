'use client';

import { useEffect, useState } from 'react';

import { useHeldModifiers } from '@/hooks/useHeldModifiers';
import { useFloatingBtnStore } from '@/store/FloatingBtnStore';
import { useSearchBarFocusStore } from '@/store/SearchBarFocusStore';

import s from './topbutton.module.scss';

const SCROLL_THRESHOLD = 50;

const TopButton = () => {
  const [isScrollPastThreshold, setIsScrollPastThreshold] = useState(false);
  const floatingMenuOpen = useFloatingBtnStore((state) => state.isOpen);
  const searchBarFocused = useSearchBarFocusStore((state) => state.isFocused);
  const heldModifiers = useHeldModifiers();
  const shiftMenuOpen = heldModifiers.shift && !searchBarFocused;
  const visible = isScrollPastThreshold && !floatingMenuOpen && !shiftMenuOpen;

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
