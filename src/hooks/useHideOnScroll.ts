'use client';

import { useEffect, useRef, useState } from 'react';

type UseHideOnScrollOptions = {
  /** 이 값(px)보다 아래로 스크롤된 상태에서만 숨김 동작이 활성화됩니다. */
  threshold?: number;
  /** 방향 판정 시 무시할 최소 이동량(px) — 미세 떨림 방지 */
  delta?: number;
};

/**
 * 스크롤 방향에 따라 요소의 노출 여부를 반환합니다.
 * - `threshold` 이하로 스크롤된 상태: 항상 노출
 * - 아래로 스크롤: 숨김 / 위로 스크롤: 노출
 */
export function useHideOnScroll({
  threshold = 100,
  delta = 6,
}: UseHideOnScrollOptions = {}): boolean {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      ticking.current = false;
      const currentY = window.scrollY;

      if (currentY <= threshold) {
        setVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      const diff = currentY - lastScrollY.current;
      if (Math.abs(diff) < delta) return;

      // 위로 스크롤(diff < 0)이면 노출, 아래로 스크롤이면 숨김
      setVisible(diff < 0);
      lastScrollY.current = currentY;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, delta]);

  return visible;
}
