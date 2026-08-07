'use client';

import Link from 'next/link';

import { FilterBar } from '@/components/filter-bar';
import { ImageSlot } from '@/components/image-slot';
import { revealDelay } from '@/lib/reveal';
import { useUrlFilter } from '@/lib/use-url-filter';
import { PRODUCT_FILTERS, type ProductFilterKey } from '@/lib/site';
import { cn } from '@/lib/utils';

export interface ProductCategoryCard {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  groups: string[];
  manufacturers: { name: string; website?: string }[];
  image?: string;
  imageAlt: string;
}

const FILTER_KEYS = PRODUCT_FILTERS.map((filter) => filter.key);

export function ProductCategoryGrid({
  categories,
}: {
  categories: ProductCategoryCard[];
}) {
  const [active, setActive] = useUrlFilter('filter', FILTER_KEYS);

  const matches = (category: ProductCategoryCard) =>
    active === 'all' || category.groups.includes(active as ProductFilterKey);

  const visible = categories.filter(matches);

  return (
    <>
      <section className="container-page pb-6">
        <FilterBar
          label="Filter"
          options={[...PRODUCT_FILTERS]}
          active={active}
          onChange={setActive}
          count={`${visible.length} of ${categories.length}`}
        />
      </section>

      <section className="container-page">
        <div className="hairline-grid grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))]">
          {visible.map((category, index) => (
            <article
              key={category.slug}
              id={category.slug}
              className="rv flex flex-col gap-[18px] bg-surface px-[26px] pt-[26px] pb-[22px] transition-colors duration-200 hover:bg-brand-soft"
              style={revealDelay(index, 3)}
            >
              <ImageSlot
                src={category.image}
                alt={category.imageAlt}
                aspect="4 / 3"
                caption={`drop photo - ${category.title.toLowerCase()}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px"
              />

              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {category.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-line px-[7px] py-[3px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-[24px] leading-[1.1] tracking-[-0.02em]">
                  {category.title}
                </h2>
                <p className="text-[14.5px] leading-[1.5] text-ink-2">
                  {category.blurb}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {category.manufacturers.map((manufacturer) => {
                  const pill = cn(
                    'rounded-full bg-[color-mix(in_oklab,var(--ink)_7%,transparent)] px-[11px] py-1.5 font-mono text-[11px] tracking-[0.04em] text-ink'
                  );

                  return manufacturer.website ? (
                    <a
                      key={manufacturer.name}
                      href={manufacturer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(pill, 'transition-colors hover:bg-ink hover:text-bg')}
                    >
                      {manufacturer.name} ↗
                    </a>
                  ) : (
                    <span key={manufacturer.name} className={pill}>
                      {manufacturer.name}
                    </span>
                  );
                })}
              </div>
            </article>
          ))}

          {/* Promo tile - always visible, and excluded from the counter. */}
          <article className="flex flex-col justify-center gap-4 bg-brand px-[26px] py-[30px] text-on-brand">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] opacity-80">
              Other requirements
            </span>
            <h2 className="max-w-[20ch] text-[26px] leading-[1.1] tracking-[-0.025em]">
              If a product falls outside these categories, we can likely source
              it.
            </h2>
            <p className="max-w-[34ch] text-[14.5px] leading-[1.5] opacity-90">
              Send an elevation or specification section and we will return
              suitable options along with availability and lead time.
            </p>
            <Link
              href="#talk"
              className="mt-1 self-start rounded-full bg-surface px-[18px] py-2.5 text-[14px] font-semibold text-ink transition-opacity hover:text-ink hover:opacity-90"
            >
              Get in touch →
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
