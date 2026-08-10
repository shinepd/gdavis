'use client';

import { cn } from '@/lib/utils';

export interface FilterOption {
  key: string;
  label: string;
}

interface FilterBarProps {
  /** Mono label at the head of the bar - "Filter" or "Manufacturer". */
  label: string;
  options: FilterOption[];
  active: string;
  onChange: (key: string) => void;
  /** Live counter, e.g. "3 of 8". */
  count: string;
}

/**
 * Chip bar for filtering a grid, pinned under the 65px header.
 *
 * Chips wrap onto as many rows as they need rather than scrolling sideways,
 * so a long manufacturer list never hides options off-screen. The bar is only
 * sticky from `lg` up: on narrow screens that list wraps to many rows, and
 * pinning it would hold nearly half the viewport hostage, so below `lg` it
 * scrolls away with the page.
 */
export function FilterBar({
  label,
  options,
  active,
  onChange,
  count,
}: FilterBarProps) {
  return (
    <div className="z-40 flex items-start gap-3 border-y border-line bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] py-4 backdrop-blur-[10px] lg:sticky lg:top-[65px]">
      <span className="shrink-0 pt-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        {label}
      </span>

      <div className="flex flex-1 flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.key === active;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onChange(option.key)}
              aria-pressed={isActive}
              className={cn(
                'whitespace-nowrap rounded-full border px-4 py-2 text-[13px] transition-colors',
                isActive
                  ? 'border-ink bg-ink text-bg'
                  : 'border-line text-ink-2 hover:border-ink-3 hover:text-ink'
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <span className="shrink-0 pt-2.5 pl-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
        {count}
      </span>
    </div>
  );
}
