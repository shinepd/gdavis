'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Mono pill that labels the theme it will switch *to* - "Dark" while light,
 * "Light" while dark. next-themes persists the choice under `gd-theme` and
 * writes both `class` and `data-theme` on <html>.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const target = resolvedTheme === 'dark' ? 'light' : 'dark';
  const label = target === 'dark' ? 'Dark' : 'Light';

  return (
    <button
      type="button"
      onClick={() => setTheme(target)}
      aria-label={`Switch to ${target} theme`}
      className="flex h-9 items-center rounded-full border border-line px-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
    >
      {/* Rendered blank until mounted so the label never mismatches on hydration. */}
      <span className={mounted ? undefined : 'invisible'}>
        {mounted ? label : 'Dark'}
      </span>
    </button>
  );
}
