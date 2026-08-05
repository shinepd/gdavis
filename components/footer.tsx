import Link from 'next/link';

import { NewsletterForm } from '@/components/newsletter-form';
import { MonoLabel } from '@/components/ui/eyebrow';
import { GEORGE, NAV_ITEMS, SITE } from '@/lib/site';

export function Footer() {
  const siteLinks = NAV_ITEMS.filter((item) => item.href !== '/');

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-10 pt-14 pb-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div className="flex flex-col gap-3.5">
          <div className="text-[16px] font-semibold tracking-[-0.015em]">
            {SITE.name}
          </div>
          <p className="max-w-[34ch] text-[14px] leading-[1.55] text-ink-2">
            {SITE.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 text-[14px]">
          <MonoLabel className="mb-1">Site</MonoLabel>
          {siteLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-2 transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 text-[14px]">
          <MonoLabel className="mb-1">Office</MonoLabel>
          <span className="leading-[1.5] text-ink-2">
            {SITE.address.street}
            <br />
            {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
          </span>
          <a
            href={GEORGE.phoneHref}
            className="text-ink-2 transition-colors hover:text-brand"
          >
            {GEORGE.phone}
          </a>
          <a
            href={`mailto:${GEORGE.email}`}
            className="text-ink-2 transition-colors hover:text-brand"
          >
            {GEORGE.email}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <MonoLabel>Stay updated</MonoLabel>
          <p className="text-[14px] leading-[1.5] text-ink-2">
            Product updates and industry news, occasionally.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-page flex flex-wrap justify-between gap-4 pb-7 text-[13px] text-ink-3">
        <span>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em]">
          {SITE.address.city}, Kansas
        </span>
      </div>
    </footer>
  );
}
