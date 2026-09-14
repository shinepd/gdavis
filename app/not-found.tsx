import Link from 'next/link';

import { Eyebrow } from '@/components/ui/eyebrow';
import { GEORGE } from '@/lib/site';

/**
 * A missing page is usually a stale link to a project that was renamed, so
 * this offers the two indexes rather than only a way home.
 */
export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <Eyebrow className="mb-[22px]">404</Eyebrow>
      <h1 className="max-w-[18ch] text-[clamp(38px,4.6vw,68px)] leading-[0.98] tracking-[-0.035em]">
        That page isn&apos;t here.
      </h1>
      <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.55] text-ink-2">
        The link may be out of date, or the project may have been renamed. The
        full catalogue and every installed project are both one click away.
      </p>
      <div className="mt-9 flex flex-wrap gap-2.5">
        <Link
          href="/projects"
          className="rounded-full bg-brand px-[22px] py-3.5 text-[14.5px] font-medium text-on-brand transition-[filter] hover:text-on-brand hover:brightness-110"
        >
          Browse projects
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-line px-[22px] py-3.5 text-[14.5px] font-medium transition-colors hover:border-ink-3 hover:text-ink"
        >
          Product lines
        </Link>
        <Link
          href="/"
          className="rounded-full border border-line px-[22px] py-3.5 text-[14.5px] font-medium transition-colors hover:border-ink-3 hover:text-ink"
        >
          Home
        </Link>
      </div>
      <p className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
        Looking for something specific?{' '}
        <a href={`mailto:${GEORGE.email}`} className="underline normal-case">
          {GEORGE.email}
        </a>
      </p>
    </section>
  );
}
