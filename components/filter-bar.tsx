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
  /**
   * A wider filter the options sit inside, shown as a removable chip on its
   * own labelled row above them. Projects uses it for the material a visitor
   * arrived from.
   */
  scope?: { name: string; label: string; onClear: () => void };
}

const MONO = 'font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3';

/**
 * Chip bar for filtering a grid, pinned under the 65px header.
 *
 * Chips wrap onto as many rows as they need rather than scrolling sideways,
 * so a long manufacturer list never hides options off-screen. The bar is only
 * sticky from `lg` up: on narrow screens that list wraps to many rows, and
 * pinning it would hold nearly half the viewport hostage, so below `lg` it
 * scrolls away with the page.
 *
 * The three columns are a grid rather than a flex row so that a scope adds a
 * second row whose label lines up with its own chip: the label column has to
 * fit both "Material" and "Manufacturer" without either being guessed at.
 */
export function FilterBar({
  label,
  options,
  active,
  onChange,
  count,
  scope,
}: FilterBarProps) {
  return (
    <div className="z-40 grid grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-2 border-y border-line bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] py-4 backdrop-blur-[10px] lg:sticky lg:top-[65px]">
      {scope && (
        <>
          <span className={cn(MONO, 'pt-2.5')}>{scope.name}</span>
          <div>
            <button
              type="button"
              onClick={scope.onClear}
              className="group inline-flex items-center gap-2 rounded-full border border-brand bg-brand-soft px-4 py-2 text-[13px] text-ink transition-colors hover:bg-brand hover:text-on-brand"
            >
              {scope.label}
              <span
                aria-hidden
                className="text-[15px] leading-none text-ink-3 transition-colors group-hover:text-on-brand"
              >
                &times;
              </span>
              <span className="sr-only">- clear this material</span>
            </button>
          </div>
          <span className={cn(MONO, 'pt-2.5 pl-2 tracking-[0.1em]')}>
            {count}
          </span>
        </>
      )}

      <span className={cn(MONO, 'pt-2.5')}>{label}</span>

      <div className="flex flex-wrap gap-2">
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

      {/* The count sits on the scope row when there is one, so this cell only
          carries it on an unscoped bar. */}
      <span className={cn(MONO, 'pt-2.5 pl-2 tracking-[0.1em]')}>
        {scope ? '' : count}
      </span>
    </div>
  );
}
