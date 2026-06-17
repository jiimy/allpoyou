'use client';

import { useEffect } from 'react';

export function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    // 1. 모달이 열리는 순간 현재 body의 원래 overflow 스타일을 백업해 둡니다.
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // 2. 뒷배경 스크롤 차단
    document.body.style.overflow = 'hidden';

    // 3. [핵심] 모달이 닫히거나 컴포넌트가 사라질 때 원래 상태로 원상복구 (Clean-up 함수)
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]); // isLocked 값이 바뀔 때마다 실행
}