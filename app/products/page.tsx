import { Suspense } from 'react';
import Link from 'next/link';

import { ImageSlot } from '@/components/image-slot';
import { ManufacturerDirectory } from '@/components/manufacturer-directory';
import { ProjectCard } from '@/components/project-card';
import {
  ProductCategoryGrid,
  type ProductCategoryCard,
} from '@/components/product-category-grid';
import { revealDelay } from '@/lib/reveal';
import { Eyebrow } from '@/components/ui/eyebrow';
import { assignPhotos } from '@/lib/category-images';
import {
  getCategoryPhotoSources,
  getManufacturersByCategory,
  getProjectCards,
  imageUrl,
} from '@/lib/sanity';
import { CATEGORY_META, CONTACT_PATHS, GEORGE, SITE } from '@/lib/site';

export default async function ProductsPage() {
  const [categories, projects, photoSources] = await Promise.all([
    getManufacturersByCategory(),
    getProjectCards(),
    getCategoryPhotoSources(),
  ]);

  const categoryImages = assignPhotos(
    categories.map((category) => ({
      key: category.slug,
      label: category.title,
      sources: photoSources[category.slug] ?? [],
    })),
    projects
  );

  // Categories with installed work behind them: only those link through to a
  // filtered Projects view, so a card never lands on an empty grid.
  const categoriesWithProjects = new Set(
    projects.flatMap((project) =>
      (project.manufacturers ?? [])
        .map((manufacturer) => manufacturer.category)
        .filter((category): category is string => Boolean(category))
    )
  );

  const cards: ProductCategoryCard[] = categories.map((category) => {
    const meta = CATEGORY_META[category.slug];
    const cover = categoryImages[category.slug];

    return {
      slug: category.slug,
      title: category.title,
      blurb: meta?.blurb ?? '',
      tags: meta?.tags ?? [],
      groups: meta?.groups ?? [],
      manufacturers: category.manufacturers.map((manufacturer) => ({
        name: manufacturer.name.trim(),
        website: manufacturer.website,
      })),
      image: imageUrl(cover?.image, 800, 600),
      imageAlt: cover?.alt ?? category.title,
      hasProjects: categoriesWithProjects.has(category.slug),
    };
  });

  const fieldProjects = projects
    .filter((project) => (project.manufacturers ?? []).length > 0)
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 pb-16 md:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow className="mb-[22px]">Product lines</Eyebrow>
            <h1 className="text-[clamp(44px,5.4vw,78px)] leading-[0.96] tracking-[-0.035em]">
              The materials that
              <br />
              finish a building,
              <br />
              <span className="text-ink-3">inside and out.</span>
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-[44ch] text-[18px] leading-[1.55] text-ink-2">
              We represent established interior and exterior product lines for
              design and construction teams across the central states, and we stay
              involved from first sample through close-out.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`mailto:${GEORGE.email}?subject=${encodeURIComponent('Sample request')}`}
                className="rounded-full bg-brand px-5 py-3 text-[14px] font-medium text-on-brand transition-[filter] hover:text-on-brand hover:brightness-110"
              >
                Get samples &amp; specs
              </a>
              <a
                href={`mailto:${GEORGE.email}?subject=${encodeURIComponent('Continuing education presentation')}`}
                className="rounded-full border border-line px-5 py-3 text-[14px] font-medium transition-colors hover:border-ink-3 hover:text-ink"
              >
                Schedule a presentation
              </a>
            </div>
          </div>
        </div>
      </section>

      <ManufacturerDirectory categories={categories} />

      <div className="pt-14">
        <Suspense
          fallback={
            <div className="container-page h-[68px] border-y border-line" />
          }
        >
          <ProductCategoryGrid categories={cards} />
        </Suspense>
      </div>

      {/* Projects using these lines */}
      <section className="container-page pt-[88px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow className="mb-3.5">Built with these lines</Eyebrow>
            <h2 className="text-[clamp(30px,3.2vw,44px)] leading-[1.04] tracking-[-0.03em]">
              Recent installations
            </h2>
          </div>
          <Link href="/projects" className="link-more">
            All projects →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fieldProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              aspect="3 / 4"
              size="sm"
              className="rv"
              style={revealDelay(index)}
            />
          ))}
        </div>
      </section>

      {/* Named contact paths */}
      <section id="talk" className="container-page pt-[88px] pb-24">
        <div className="grid overflow-hidden rounded-md border border-line bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col gap-5 border-line p-8 md:p-11 lg:border-r">
            <div className="flex items-center gap-4">
              <ImageSlot
                src={GEORGE.photo}
                alt={GEORGE.name}
                sizes="72px"
                objectPosition="50% 20%"
                className="h-[72px] w-[72px] flex-none rounded-full"
              />
              <div>
                <div className="text-[19px] font-semibold tracking-[-0.015em]">
                  {GEORGE.name}
                </div>
                <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
                  Manufacturer&apos;s representative
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-[1.55] text-ink-2">
              Selecting the right architectural product should be a
              straightforward part of your process. Reach out directly and you
              will get a considered answer.
            </p>
            <div className="flex flex-col gap-1.5 text-[15px]">
              <a href={GEORGE.phoneHref} className="font-medium hover:text-brand">
                {GEORGE.phone}
              </a>
              <a
                href={`mailto:${GEORGE.email}`}
                className="text-ink-2 hover:text-brand"
              >
                {GEORGE.email}
              </a>
              <span className="text-[14px] text-ink-3">
                {SITE.address.street}, {SITE.address.city}, {SITE.address.state}{' '}
                {SITE.address.zip}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 border-t border-line p-8 md:p-11 lg:border-t-0">
            <h2 className="max-w-[24ch] text-[clamp(26px,2.6vw,36px)] leading-[1.06] tracking-[-0.03em]">
              Samples, specifications, and continuing education.
            </h2>
            <div className="hairline-grid">
              {CONTACT_PATHS.map((path) => (
                <a
                  key={path.subject}
                  href={`mailto:${GEORGE.email}?subject=${encodeURIComponent(path.subject)}`}
                  className="flex items-center justify-between gap-4 bg-surface px-5 py-4.5 transition-colors hover:bg-brand-soft hover:text-ink"
                >
                  <span>
                    <span className="block text-[15.5px] font-semibold">
                      {path.title}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] text-ink-3">
                      {path.detail}
                    </span>
                  </span>
                  <span className="text-[18px] text-brand">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
