import { Fragment } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/cta-band';
import { ImageSlot } from '@/components/image-slot';
import { PortableText } from '@/components/portable-text';
import { ProjectCard } from '@/components/project-card';
import { BreadcrumbSchema } from '@/components/structured-data';
import { revealDelay } from '@/lib/reveal';
import { Eyebrow, MonoLabel } from '@/components/ui/eyebrow';
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectCards,
  imageUrl,
  urlFor,
} from '@/lib/sanity';
import { pageMetadata } from '@/lib/seo';
import { formatLocation } from '@/lib/site';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();

  return slugs.map((slug) => ({ slug }));
}

/**
 * The lines used on a project, each linking to its card on Products.
 *
 * That card is where a line's detail lives - the blurb, the applications, and
 * the link out to the manufacturer's own site - so it is the right answer to
 * "what is that facade". A line with no category has no card to point at and
 * stays plain text.
 */
function LineList({
  lines,
  separator,
}: {
  lines: { name: string; category?: string }[];
  separator: string;
}) {
  return lines.map((line, index) => (
    <Fragment key={line.name}>
      {index > 0 && separator}
      {line.category ? (
        <Link
          href={`/products#${line.category}`}
          className="underline decoration-line underline-offset-[3px] transition-colors hover:decoration-brand"
        >
          {line.name}
        </Link>
      ) : (
        line.name
      )}
    </Fragment>
  ));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      // The root layout's title template appends the firm name.
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  // Most projects carry no prose, so the fallback is built from the facts the
  // record does have. A shared boilerplate line across seventy-odd pages reads
  // as duplicate content and gives a searcher nothing to click.
  const facts = [
    formatLocation(project.location),
    project.projectDate ? format(parseISO(project.projectDate), 'MMMM yyyy') : '',
    (project.architects ?? [])
      .map((architect) => architect.name.trim())
      .filter(Boolean)
      .join(', '),
  ].filter(Boolean);

  const lines = (project.manufacturers ?? [])
    .map((manufacturer) => manufacturer.name.trim())
    .filter(Boolean);

  let description = [
    `${project.title.trim()}${facts.length ? ` - ${facts.join(' · ')}` : ''}.`,
    lines.length
      ? `Finished with ${lines.join(', ')}, represented by G. Davis & Associates.`
      : 'An installation represented by G. Davis & Associates.',
  ].join(' ');

  const firstBlock = project.description?.[0];
  if (
    firstBlock &&
    typeof firstBlock === 'object' &&
    'children' in firstBlock &&
    Array.isArray(firstBlock.children) &&
    firstBlock.children[0] &&
    'text' in firstBlock.children[0]
  ) {
    description = (firstBlock.children[0].text as string) || description;
  }

  return pageMetadata({
    title: project.title.trim(),
    description,
    path: `/projects/${slug}`,
    type: 'article',
    // Left undefined rather than empty when a project has no cover, so the
    // page falls back to the site card instead of shipping none.
    images: project.coverImage
      ? [urlFor(project.coverImage).width(1200).height(630).url()]
      : undefined,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjectCards(),
  ]);

  if (!project) {
    notFound();
  }

  // parseISO, not `new Date`: a date-only string goes through `new Date` as UTC
  // midnight, which formats as the previous month here for anything dated the
  // first of a month.
  const completed = project.projectDate
    ? format(parseISO(project.projectDate), 'MMMM yyyy')
    : '';
  const lines = (project.manufacturers ?? []).map((manufacturer) => ({
    name: manufacturer.name.trim(),
    category: manufacturer.category,
  }));
  const manufacturerNames = lines.map((line) => line.name);

  // Other work using the same lines, so a visitor can keep browsing by material.
  const related = allProjects
    .filter(
      (candidate) =>
        candidate.slug.current !== slug &&
        (candidate.manufacturers ?? []).some((manufacturer) =>
          manufacturerNames.includes(manufacturer.name.trim())
        )
    )
    .slice(0, 4);

  const facts = [
    { label: 'Location', value: formatLocation(project.location) },
    { label: 'Completed', value: completed },
    {
      label: project.architects?.length === 1 ? 'Architect' : 'Architects',
      value: (project.architects ?? [])
        .map((architect) => architect.name.trim())
        .join(', '),
    },
    {
      label: lines.length === 1 ? 'Manufacturer' : 'Manufacturers',
      value: manufacturerNames.join(', '),
      // Rendered as links instead, so the fact row is a way into the line
      // rather than a dead end.
      node: <LineList lines={lines} separator=", " />,
    },
  ].filter((fact) => fact.value);

  const hasDescription = (project.description ?? []).length > 0;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Projects', path: '/projects' },
          { name: project.title.trim(), path: `/projects/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="container-page pt-14 md:pt-20">
        <Link href="/projects" className="link-more mb-8 text-ink-2">
          ← All projects
        </Link>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow className="mb-[22px]">Project</Eyebrow>
            <h1 className="text-[clamp(38px,4.6vw,68px)] leading-[0.98] tracking-[-0.035em]">
              {project.title.trim()}
            </h1>
          </div>
          {lines.length > 0 && (
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand">
              <LineList lines={lines} separator=" · " />
            </div>
          )}
        </div>

        <ImageSlot
          src={imageUrl(project.coverImage, 2100, 900)}
          alt={project.title.trim()}
          aspect="21 / 9"
          caption="project photo"
          sizes="(max-width: 1360px) 100vw, 1360px"
          priority
          large
          className="mt-12"
        />
      </section>

      {/* Facts + description. Many projects carry no write-up, so the facts
          spread across the full width rather than leaving a dead column. */}
      <section className="container-page pt-14">
        <div
          className={cn(
            'grid gap-12',
            hasDescription && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]'
          )}
        >
          <dl
            className={cn(
              'grid',
              hasDescription
                ? 'grid-cols-1'
                : 'gap-x-8 sm:grid-cols-2 lg:grid-cols-4'
            )}
          >
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 border-t border-line py-4"
              >
                <dt>
                  <MonoLabel>{fact.label}</MonoLabel>
                </dt>
                <dd className="text-[15.5px] text-ink">
                  {fact.node ?? fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {hasDescription && (
            <div className="max-w-[68ch] text-[16.5px] leading-[1.6] text-ink-2">
              <PortableText value={project.description} />
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {project.projectImages && project.projectImages.length > 0 && (
        <section className="container-page pt-[88px]">
          <h2 className="mb-7 text-[clamp(26px,2.6vw,36px)] leading-[1.06] tracking-[-0.03em]">
            More from this project
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(330px,100%),1fr))] gap-5">
            {project.projectImages.map((image, index) => (
              <figure
                key={index}
                className="rv flex flex-col gap-2.5"
                style={revealDelay(index, 3)}
              >
                <ImageSlot
                  src={imageUrl(image, 800, 600)}
                  alt={image.alt || `${project.title.trim()} - image ${index + 1}`}
                  aspect="4 / 3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 340px"
                />
                {image.caption && (
                  <figcaption className="text-[13.5px] text-ink-3">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Related work */}
      {related.length > 0 && (
        <section className="container-page pt-[88px]">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-8">
            <h2 className="text-[clamp(26px,2.6vw,36px)] leading-[1.06] tracking-[-0.03em]">
              Built with the same lines
            </h2>
            <Link href="/projects" className="link-more">
              All projects →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProjectCard
                key={item._id}
                project={item}
                size="sm"
                className="rv"
                style={revealDelay(index)}
              />
            ))}
          </div>
        </section>
      )}

      <CtaBand
        title="Considering a similar assembly?"
        description="We can provide samples, detailing support, and a preliminary budget for the same lines on your project."
        primary={{ href: '/contact', label: 'Contact us' }}
        secondary={{ href: '/products', label: 'Browse products' }}
      />
    </>
  );
}
