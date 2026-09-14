'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { Eyebrow } from '@/components/ui/eyebrow';
import { GEORGE } from '@/lib/site';

/**
 * Shown when a page throws at runtime - most plausibly a Sanity fetch failing,
 * which `reset()` can genuinely recover from, so retrying is the first offer.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <Eyebrow className="mb-[22px]">Something went wrong</Eyebrow>
      <h1 className="max-w-[20ch] text-[clamp(38px,4.6vw,68px)] leading-[0.98] tracking-[-0.035em]">
        This page didn&apos;t load.
      </h1>
      <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.55] text-ink-2">
        The problem is on our end, not yours. Trying again usually works; if it
        does not, we would still like to hear from you.
      </p>
      <div className="mt-9 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer rounded-full bg-brand px-[22px] py-3.5 text-[14.5px] font-medium text-on-brand transition-[filter] hover:brightness-110"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-line px-[22px] py-3.5 text-[14.5px] font-medium transition-colors hover:border-ink-3 hover:text-ink"
        >
          Home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-line px-[22px] py-3.5 text-[14.5px] font-medium transition-colors hover:border-ink-3 hover:text-ink"
        >
          Contact us
        </Link>
      </div>
      <p className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
        <a href={`mailto:${GEORGE.email}`} className="underline normal-case">
          {GEORGE.email}
        </a>
        {error.digest && ` · reference ${error.digest}`}
      </p>
    </section>
  );
}
