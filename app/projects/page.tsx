import { Metadata } from 'next';
import { Suspense } from 'react';

import { CtaBand } from '@/components/cta-band';
import { ProjectGrid } from '@/components/project-grid';
import { Eyebrow } from '@/components/ui/eyebrow';
import { getProjectCards } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Projects | G. Davis & Associates',
  description:
    'Aviation, education, civic, and healthcare work across Kansas, Missouri, Iowa, and Nebraska, finished with the product lines G. Davis & Associates represents.',
};

export default async function ProjectsPage() {
  const projects = await getProjectCards();

  // Chips come from the manufacturers that actually appear on a project,
  // ordered by how much work each one has behind it.
  const counts = new Map<string, { key: string; label: string; count: number }>();
  for (const project of projects) {
    for (const manufacturer of project.manufacturers ?? []) {
      const key = manufacturer.slug?.current;
      if (!key) continue;

      const entry = counts.get(key);
      if (entry) {
        entry.count += 1;
      } else {
        counts.set(key, { key, label: manufacturer.name.trim(), count: 1 });
      }
    }
  }

  const manufacturers = Array.from(counts.values())
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .map(({ key, label }) => ({ key, label }));

  return (
    <>
      <section className="container-page pt-16 pb-12 md:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow className="mb-[22px]">Projects</Eyebrow>
            <h1 className="text-[clamp(44px,5.4vw,78px)] leading-[0.96] tracking-[-0.035em]">
              Our product lines,
              <br />
              installed and
              <br />
              <span className="text-ink-3">performing.</span>
            </h1>
          </div>
          <p className="max-w-[44ch] text-[18px] leading-[1.55] text-ink-2">
            Aviation, education, civic, and healthcare work across Kansas,
            Missouri, Iowa, and Nebraska. Filter by manufacturer to review a
            product in place before specifying it.
          </p>
        </div>
      </section>

      <Suspense
        fallback={<div className="container-page h-[68px] border-y border-line" />}
      >
        <ProjectGrid projects={projects} manufacturers={manufacturers} />
      </Suspense>

      <CtaBand
        title="Review a project in person"
        description="We can arrange a site visit or bring the same assembly to your office as a mockup for review."
        primary={{ href: '/contact', label: 'Contact us' }}
        secondary={{ href: '/products', label: 'Browse products' }}
      />
    </>
  );
}
