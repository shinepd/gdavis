import Link from 'next/link';

import { CtaBand } from '@/components/cta-band';
import { ImageSlot } from '@/components/image-slot';
import { ProjectCard } from '@/components/project-card';
import { revealDelay } from '@/lib/reveal';
import { Eyebrow, MonoLabel } from '@/components/ui/eyebrow';
import { buildCategoryImages } from '@/lib/category-images';
import { getManufacturersByCategory, getProjectCards, imageUrl } from '@/lib/sanity';
import { HOME_CATEGORIES, SITE } from '@/lib/site';

const VALUE_POINTS = [
  'Experienced team',
  'Quality product lines',
  'Technical support',
  'Service through punch list',
];

export default async function Home() {
  const [categories, projects] = await Promise.all([
    getManufacturersByCategory(),
    getProjectCards(),
  ]);

  const categoryImages = buildCategoryImages(categories, projects);
  const manufacturerCount = categories.reduce(
    (total, category) => total + category.manufacturers.length,
    0
  );

  const heroProject = projects.find((project) => project.coverImage);
  const recentProjects = projects.slice(0, 4);
  // A different building from the hero, so the page doesn't repeat itself.
  const aboutProject = projects.find(
    (project) => project.coverImage && project._id !== heroProject?._id
  );

  // The six home cards each draw from several product categories; claim a
  // distinct photo per card so neighbouring tiles never show the same building.
  const claimed = new Set<string>();
  const homeCovers = HOME_CATEGORIES.map((group) => {
    const cover = group.categorySlugs
      .map((slug) => categoryImages[slug])
      .find((entry) => entry?.image && !claimed.has(entry.alt));

    if (cover) claimed.add(cover.alt);
    return cover;
  });

  const stats = [
    { value: String(categories.length), label: 'Product categories' },
    { value: String(manufacturerCount), label: 'Manufacturers represented' },
    { value: SITE.territory, label: 'Territory we cover' },
    { value: '1 call', label: 'To reach a real person' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="container-page">
        <div className="grid items-end gap-10 pt-16 md:pt-[84px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <Eyebrow className="mb-[22px]">
              Manufacturer&apos;s representative · {SITE.address.city},{' '}
              {SITE.address.state}
            </Eyebrow>
            <h1 className="text-[clamp(46px,6vw,86px)] leading-[0.94] tracking-[-0.04em]">
              Ceilings and facades,
              <br />
              specified with
              <br />
              <span className="text-brand">confidence.</span>
            </h1>
          </div>
          <div className="flex flex-col gap-6 pb-2">
            <p className="max-w-[40ch] text-[19px] leading-[1.5] text-ink-2">
              {SITE.tagline} We bring the samples, the details, and the answers -
              then stay on the job until it&apos;s installed.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/products"
                className="rounded-full bg-brand px-[22px] py-3.5 text-[14.5px] font-medium text-on-brand transition-[filter] hover:text-on-brand hover:brightness-110"
              >
                Browse product lines
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-line px-[22px] py-3.5 text-[14.5px] font-medium transition-colors hover:border-ink-3 hover:text-ink"
              >
                Talk to a rep
              </Link>
            </div>
          </div>
        </div>

        <ImageSlot
          src={imageUrl(heroProject?.coverImage, 2100, 800)}
          alt={heroProject ? heroProject.title.trim() : ''}
          aspect="21 / 8"
          caption="drop photo - hero building exterior, terracotta or metal facade"
          sizes="(max-width: 1360px) 100vw, 1360px"
          priority
          large
          className="rv mt-14"
        />
      </section>

      {/* Stat strip */}
      <section className="container-page pt-10">
        <div className="hairline-grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface px-6 py-6">
              <div className="text-[34px] font-semibold tracking-[-0.03em]">
                {stat.value}
              </div>
              <MonoLabel className="mt-2 block">{stat.label}</MonoLabel>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-page pt-[88px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow className="mb-3.5">What we represent</Eyebrow>
            <h2 className="text-[clamp(30px,3.4vw,48px)] leading-[1.02] tracking-[-0.032em]">
              Six ways to finish a building
            </h2>
          </div>
          <Link href="/products" className="link-more">
            All {categories.length} categories →
          </Link>
        </div>

        <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-3">
          {HOME_CATEGORIES.map((group, index) => {
            const names = group.categorySlugs.flatMap(
              (slug) =>
                categories
                  .find((category) => category.slug === slug)
                  ?.manufacturers.map((manufacturer) => manufacturer.name.trim()) ??
                []
            );
            const cover = homeCovers[index];

            return (
              <Link
                key={group.title}
                href={group.href}
                className="rv flex flex-col gap-3 bg-surface p-[26px] transition-colors duration-200 hover:bg-brand-soft hover:text-ink"
                style={revealDelay(index, 3)}
              >
                <ImageSlot
                  src={imageUrl(cover?.image, 640, 400)}
                  alt={cover?.alt ?? group.title}
                  aspect="16 / 10"
                  caption={`${group.title.toLowerCase()} photo`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px"
                />
                <h3 className="text-[21px] tracking-[-0.02em]">{group.title}</h3>
                <p className="text-[14.5px] leading-[1.5] text-ink-2">
                  {group.blurb}
                </p>
                <span className="mt-auto pt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-brand">
                  {Array.from(new Set(names)).slice(0, 4).join(' · ')}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent work */}
      <section className="container-page pt-[88px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-8">
          <h2 className="text-[clamp(30px,3.4vw,48px)] leading-[1.02] tracking-[-0.032em]">
            Recent work
          </h2>
          <Link href="/projects" className="link-more">
            All projects →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recentProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              aspect="4 / 5"
              size="sm"
              showManufacturers={false}
              className="rv"
              style={revealDelay(index)}
            />
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="container-page pt-[88px]">
        <div className="hairline-grid lg:grid-cols-2">
          <ImageSlot
            src={imageUrl(aboutProject?.coverImage, 900, 900)}
            alt={aboutProject ? aboutProject.title.trim() : ''}
            caption="drop photo - team or office"
            sizes="(max-width: 1024px) 100vw, 680px"
            large
            className="rv min-h-[280px] rounded-none lg:min-h-[420px]"
          />
          <div className="flex flex-col justify-center gap-5 bg-surface p-8 md:p-12">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="max-w-[22ch] text-[clamp(28px,2.8vw,40px)] leading-[1.05] tracking-[-0.03em]">
              A small firm that answers its own phone.
            </h2>
            <p className="max-w-[46ch] text-[16px] leading-[1.55] text-ink-2">
              We bridge the gap between the people who make architectural products
              and the people who draw them into buildings - with real technical
              knowledge, not a catalog drop-off.
            </p>
            <div className="mt-1 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
              {VALUE_POINTS.map((point) => (
                <div
                  key={point}
                  className="flex items-baseline gap-2.5 text-[14.5px]"
                >
                  <span className="text-brand">-</span>
                  {point}
                </div>
              ))}
            </div>
            <Link href="/about" className="link-more mt-2 self-start">
              More about us →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to start your next project?"
        description="Send the elevation or the spec section. We'll come back with options that hold the schedule."
        primary={{ href: '/contact', label: 'Contact us' }}
        secondary={{ href: '/products', label: 'Browse products' }}
      />
    </>
  );
}
