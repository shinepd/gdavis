'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const OPTIONS = [
  { value: 'system', label: 'Match device', Icon: MonitorIcon },
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
] as const;

/**
 * Three-segment theme picker: match device, light, dark.
 *
 * It shows all three choices with the current one filled rather than labelling
 * a single button with the theme it switches *to*. A lone "Dark" reads equally
 * well as "you are in dark mode", and nothing on screen resolves which is
 * meant; a segmented control states the answer instead of implying it.
 *
 * "Match device" is a real option, not decoration. next-themes only consults
 * `prefers-color-scheme` while the stored preference is `system`, so without a
 * way back, one click would pin a visitor's theme permanently - including
 * against their machine's own light/dark schedule on every later visit.
 *
 * next-themes persists the choice under `gd-theme` and writes both `class` and
 * `data-theme` on <html>.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setMounted(true), []);

  // The stored preference is unreadable on the server, so until hydration the
  // control shows `system`: correct for everyone who has never chosen, and
  // corrected in place for the few who have. Showing nothing selected instead
  // would leave the control looking broken for as long as the JS takes to
  // arrive, which on a slow connection is a good deal longer than one frame.
  const selected = (mounted && theme) || 'system';

  // Roving tabindex, per the ARIA radio group pattern: the group is a single
  // tab stop and the arrow keys move between segments.
  const move = (event: React.KeyboardEvent) => {
    const current = OPTIONS.findIndex((option) => option.value === selected);
    let next: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = current + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = current - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = OPTIONS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    const wrapped = (next + OPTIONS.length) % OPTIONS.length;

    setTheme(OPTIONS[wrapped].value);
    buttons.current[wrapped]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      onKeyDown={move}
      className="flex h-9 items-center gap-0.5 rounded-full border border-line p-[3px]"
    >
      {OPTIONS.map((option, index) => {
        const isSelected = option.value === selected;

        return (
          <button
            key={option.value}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
            title={option.label}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => setTheme(option.value)}
            className={cn(
              'flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full transition-colors',
              isSelected
                ? 'bg-ink text-bg'
                : 'text-ink-2 hover:bg-swatch hover:text-ink'
            )}
          >
            <option.Icon
              aria-hidden
              strokeWidth={2}
              className="h-[13px] w-[13px]"
            />
          </button>
        );
      })}
    </div>
  );
}
