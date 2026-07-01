'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const applyParams = useCallback(
    (
      updates: Record<string, string | null | undefined>,
      method: 'push' | 'replace',
    ) => {
      const next = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value == null || value === '') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }

      const qs = next.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      const navigate = method === 'push' ? router.push : router.replace;
      navigate(href, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const replaceParams = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      applyParams(updates, 'replace');
    },
    [applyParams],
  );

  const pushParams = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      applyParams(updates, 'push');
    },
    [applyParams],
  );

  const getParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams],
  );

  const parseIntParam = useCallback(
    (key: string): number | null => {
      const raw = searchParams.get(key);
      if (!raw) return null;
      const parsed = Number.parseInt(raw, 10);
      return Number.isFinite(parsed) ? parsed : null;
    },
    [searchParams],
  );

  return { searchParams, replaceParams, pushParams, getParam, parseIntParam };
}
