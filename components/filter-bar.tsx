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
 * Sticky chip bar pinned directly under the 65px header. Scrolls horizontally
 * on narrow screens rather than wrapping into a tall stack.
 */
export function FilterBar({
  label,
  options,
  active,
  onChange,
  count,
}: FilterBarProps) {
  return (
    <div className="sticky top-[65px] z-40 flex items-center gap-2 border-y border-line bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] py-4 backdrop-blur-[10px]">
      <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        {label}
      </span>

      {/* The chips scroll sideways on narrow screens; the counter stays put. */}
      <div className="flex flex-1 gap-2 overflow-x-auto py-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {options.map((option) => {
          const isActive = option.key === active;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onChange(option.key)}
              aria-pressed={isActive}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] transition-colors',
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

      <span className="shrink-0 pl-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
        {count}
      </span>
    </div>
  );
}
