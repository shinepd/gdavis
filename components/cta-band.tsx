import Link from 'next/link';

interface CtaAction {
  href: string;
  label: string;
}

interface CtaBandProps {
  title: string;
  description: string;
  primary: CtaAction;
  secondary?: CtaAction;
}

/** Full-width terracotta band that closes the Home, Projects, and About pages. */
export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: CtaBandProps) {
  return (
    <section className="container-page pt-[88px] pb-24">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-md bg-brand px-8 py-12 text-on-brand md:px-12 md:py-14">
        <div>
          <h2 className="max-w-[24ch] text-[clamp(28px,3vw,42px)] leading-[1.04] tracking-[-0.03em]">
            {title}
          </h2>
          <p className="mt-3.5 max-w-[44ch] text-[16.5px] leading-[1.5] opacity-90">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href={primary.href}
            className="rounded-full bg-surface px-[22px] py-3.5 text-[14.5px] font-semibold text-ink transition-opacity hover:text-ink hover:opacity-90"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="rounded-full border border-[color-mix(in_oklab,var(--on-accent)_45%,transparent)] px-[22px] py-3.5 text-[14.5px] font-medium text-on-brand transition-colors hover:bg-[color-mix(in_oklab,var(--on-accent)_12%,transparent)] hover:text-on-brand"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
