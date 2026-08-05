'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Keeps a single-select filter in the URL (`?filter=ceilings`) so a filtered
 * view can be linked and shared. Falls back to `all` for an unknown value.
 */
export function useUrlFilter(
  param: string,
  validKeys: readonly string[],
  fallback = 'all'
): [string, (key: string) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get(param);
  const active = raw && validKeys.includes(raw) ? raw : fallback;

  const setActive = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (key === fallback) {
        params.delete(param);
      } else {
        params.set(param, key);
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [fallback, param, pathname, router, searchParams]
  );

  return [active, setActive];
}
