// src/hooks/useMobile.ts
'use client';

import { useState, useEffect } from 'react';

export function useMobile(breakpoint = 768) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileDevice(window.innerWidth < breakpoint);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return () => isMobileDevice;
}