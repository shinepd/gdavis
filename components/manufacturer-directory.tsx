import Image from 'next/image';

import { Eyebrow } from '@/components/ui/eyebrow';
import { imageUrl, type ManufacturerCategory } from '@/lib/sanity';
import { MANUFACTURER_SUBLINES } from '@/lib/site';

/**
 * The roster of represented lines, above the category filter on Products.
 *
 * Order comes from flattening the categories, so the list groups by material
 * the way the handoff draws it. Every entry links out to the manufacturer's own
 * site in a new tab; there are no manufacturer detail pages here.
 *
 * Each brand therefore appears twice on the page - once here with its logo, and
 * again as a text pill on the relevant category card. That redundancy is
 * intended by the design.
 */
export function ManufacturerDirectory({
  categories,
}: {
  categories: ManufacturerCategory[];
}) {
  const entries = categories.flatMap((category) =>
    category.manufacturers.map((manufacturer) => ({
      id: manufacturer._id,
      name: manufacturer.name.trim(),
      website: manufacturer.website,
      logo: imageUrl(manufacturer.logo, 400),
      subline:
        MANUFACTURER_SUBLINES[manufacturer.slug?.current ?? ''] ??
        category.title,
    }))
  );

  if (entries.length === 0) return null;

  return (
    <section className="container-page pb-2">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-8">
        <div>
          <Eyebrow className="mb-3.5">Represented lines</Eyebrow>
          <h2 className="max-w-[24ch] text-[clamp(28px,3.2vw,44px)] leading-[1.03] tracking-[-0.032em]">
            Manufacturers we stand behind
          </h2>
        </div>
        <p className="max-w-[38ch] text-[15px] leading-[1.55] text-ink-2">
          Each line is selected for a documented record of quality, performance,
          and support in the field.
        </p>
      </div>

      <div className="hairline-grid grid-cols-[repeat(auto-fill,minmax(min(215px,100%),1fr))]">
        {entries.map((entry) => {
          const inner = (
            <>
              {/* Fixed 36px contain-fit cell keeps a roster of mixed-aspect
                  logos even. The light plate is applied in both themes: the
                  supplied files mix opaque JPEGs with dark-ink transparent
                  PNGs, so neither theme can render them raw. */}
              <div className="relative h-9 w-full overflow-hidden rounded-[2px] bg-logo-plate">
                {entry.logo && (
                  <Image
                    src={entry.logo}
                    alt={`${entry.name} logo`}
                    fill
                    sizes="200px"
                    className="object-contain object-left p-1"
                  />
                )}
              </div>
              <div>
                <div className="flex items-baseline gap-1.5 text-[15px] font-semibold tracking-[-0.014em]">
                  {entry.name}
                  {entry.website && (
                    <span className="text-[12px] text-brand">↗</span>
                  )}
                </div>
                <div className="mt-1 text-[12.5px] leading-[1.4] text-ink-3">
                  {entry.subline}
                </div>
              </div>
            </>
          );

          const className =
            'flex flex-col gap-3.5 bg-surface px-[18px] py-5 transition-colors duration-200 hover:bg-brand-soft hover:text-ink';

          return entry.website ? (
            <a
              key={entry.id}
              href={entry.website}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          ) : (
            <div key={entry.id} className={className}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
