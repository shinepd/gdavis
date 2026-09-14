import Link from 'next/link';

import { cn } from '@/lib/utils';

export interface FilterOption {
  key: string;
  label: string;
}

/** A chip, plus the URL it filters to. */
export interface FilterChip extends FilterOption {
  href: string;
}

interface FilterBarProps {
  /** Mono label at the head of the bar - "Filter" or "Manufacturer". */
  label: string;
  options: FilterChip[];
  active: string;
  /** Live counter, e.g. "3 of 8". */
  count: string;
  /**
   * A wider filter the options sit inside, shown as a removable chip on its
   * own labelled row above them. Projects uses it for the material a visitor
   * arrived from.
   */
  scope?: { name: string; label: string; clearHref: string };
}

const MONO = 'font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3';

/**
 * Chip bar for filtering a grid, pinned under the 65px header.
 *
 * The chips are links, not buttons, and the grid they filter is rendered on
 * the server from the same query string. That keeps the filtered view in the
 * HTML: a crawler following `?material=composite-stone` gets the matching
 * projects rather than an empty shell, and the bar still works before - or
 * without - hydration. `scroll={false}` keeps a chip click from jumping the
 * page back to the top.
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
 *
 * Below `sm` the chips span the full width instead of sharing a row with the
 * label. Holding the label column on a phone left roughly 215px of a 390px
 * screen for chips, which wrapped nineteen manufacturers into seventeen rows
 * and pushed the first project most of a screen down. The counter is desktop
 * only for the same reason - the filtered grid is directly below it.
 */
export function FilterBar({
  label,
  options,
  active,
  count,
  scope,
}: FilterBarProps) {
  return (
    <div className="z-40 grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-2 border-y border-line bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] py-4 backdrop-blur-[10px] sm:grid-cols-[auto_1fr_auto] lg:sticky lg:top-[65px]">
      {scope && (
        <>
          <span className={cn(MONO, 'self-center sm:self-start sm:pt-2.5')}>
            {scope.name}
          </span>
          <div>
            <Link
              href={scope.clearHref}
              scroll={false}
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
            </Link>
          </div>
          <span
            className={cn(
              MONO,
              'hidden pt-2.5 pl-2 tracking-[0.1em] sm:inline',
            )}
          >
            {count}
          </span>
        </>
      )}

      <span className={cn(MONO, 'col-span-2 sm:col-span-1 sm:pt-2.5')}>
        {label}
      </span>

      <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1">
        {options.map((option) => {
          const isActive = option.key === active;

          return (
            <Link
              key={option.key}
              href={option.href}
              scroll={false}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'whitespace-nowrap rounded-full border px-4 py-2 text-[13px] transition-colors',
                isActive
                  ? 'border-ink bg-ink text-bg hover:text-bg'
                  : 'border-line text-ink-2 hover:border-ink-3 hover:text-ink',
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </div>

      {/* The count sits on the scope row when there is one, so this cell only
          carries it on an unscoped bar. */}
      <span
        className={cn(MONO, 'hidden pt-2.5 pl-2 tracking-[0.1em] sm:inline')}
      >
        {scope ? '' : count}
      </span>
    </div>
  );
}
