import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Mono uppercase label that sits above a page or section headline. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'font-mono text-[11px] uppercase tracking-[0.16em] text-brand',
        className
      )}
    >
      {children}
    </div>
  );
}

/** Smaller mono label used for footer column heads, counters, and card tags. */
export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3',
        className
      )}
    >
      {children}
    </span>
  );
}
