'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  getLastVisitedPageSettings,
  isValidLastVisitedPath,
  saveLastVisitedPath,
} from '@/utils/lastVisitedPageStorage';

/** 체크 시 마지막 방문 경로 저장, 재방문 시 `/`에서 저장된 경로로 이동 */
export function LastVisitedPageBootstrap() {
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const didRedirect = useRef(false);

  useEffect(() => {
    if (didRedirect.current || pathname !== '/') return;

    const settings = getLastVisitedPageSettings();
    if (
      !settings.enabled ||
      settings.path === '/' ||
      !isValidLastVisitedPath(settings.path)
    ) {
      return;
    }

    didRedirect.current = true;
    router.replace(settings.path);
  }, [pathname, router]);

  useEffect(() => {
    if (!pathname) return;

    const settings = getLastVisitedPageSettings();
    if (!settings.enabled || settings.path === pathname) return;

    saveLastVisitedPath(pathname);
  }, [pathname]);

  return null;
}
