'use client';

import { useHideOnScroll } from '@/hooks/useHideOnScroll';
import { useMobile } from '@/hooks/useMobile';

import SearchBar, { type SearchBarProps } from './SearchBar';
import s from './stickySearchBar.module.scss';

/**
 * SearchBar를 sticky로 감싸는 래퍼.
 * - PC: 스크롤해도 항상 상단에 고정 노출
 * - 모바일: 100px 초과 스크롤 시 위로 스크롤하면 노출, 아래로 스크롤하면 숨김
 */
export default function StickySearchBar(props: SearchBarProps) {
  const isMobile = useMobile();
  const isVisible = useHideOnScroll({ threshold: 100 });
  const hide = isMobile && !isVisible;

  return (
    <div className={`${s.sticky} ${hide ? s.hidden : ''}`}>
      <SearchBar {...props} />
    </div>
  );
}
