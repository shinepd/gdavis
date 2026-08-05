'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon } from 'lucide-react';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { GEORGE, NAV_ITEMS, SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Sticky translucent header, ~65px tall - the offset the sticky filter bars on
 * Products and Projects are pinned against. On Contact the CTA becomes the
 * phone number, since calling is the point of that page.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onContact = pathname === '/contact';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-[14px]">
      <div className="flex items-center justify-between gap-6 px-5 py-4 md:px-10">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap"
        >
          {SITE.name}
        </Link>

        <nav className="hidden items-center gap-7 text-[13.5px] text-ink-2 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-brand',
                isActive(item.href) && 'font-medium text-ink'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            href={onContact ? GEORGE.phoneHref! : '/contact'}
            className="hidden h-9 items-center rounded-full bg-ink px-4 text-[13px] font-medium text-bg transition-colors hover:bg-brand hover:text-on-brand sm:flex"
          >
            {onContact ? GEORGE.phone : 'Request samples'}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-ink-3 hover:text-ink lg:hidden"
            >
              <MenuIcon className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="flex flex-col gap-1 px-6 pt-10">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex min-h-11 items-center text-[19px] tracking-[-0.02em] text-ink-2 transition-colors hover:text-brand',
                      isActive(item.href) && 'font-medium text-ink'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-6 flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-[14px] font-medium text-bg hover:text-bg"
                >
                  Request samples
                </Link>
                <a
                  href={GEORGE.phoneHref}
                  className="mt-3 flex min-h-11 items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3"
                >
                  {GEORGE.phone}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
