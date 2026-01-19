import { Metadata } from 'next';
import { Suspense } from 'react';

import { Separator } from '@/components/ui/separator';
import { getPaginatedProjects, getProjectFilterOptions } from '@/lib/sanity';
import { InfiniteProjectsList } from '@/components/infinite-projects-list';
import { ProjectFilters } from '@/components/project-filters';
import { CtaSection } from '@/components/sections/cta-section';

export const metadata: Metadata = {
  title: 'Projects | G. Davis & Associates',
  description:
    'Explore our showcase of projects featuring high-quality architectural products from G. Davis & Associates.',
};

interface ProjectsPageProps {
  searchParams: Promise<{ architect?: string; manufacturer?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const architectId = params.architect;
  const manufacturerId = params.manufacturer;

  // Fetch initial batch of projects with filters
  const [{ projects, hasMore, total }, filterOptions] = await Promise.all([
    getPaginatedProjects(0, 9, { architectId, manufacturerId }),
    getProjectFilterOptions(),
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Projects Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-4 mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading uppercase tracking-wide text-3xl mb-2">
                  Featured Projects
                </h2>
                <p className="text-muted-foreground max-w-[700px]">
                  Browse our portfolio of projects where our products have been
                  utilized.
                </p>
              </div>

              <Suspense fallback={null}>
                <ProjectFilters
                  architects={filterOptions.architects}
                  manufacturers={filterOptions.manufacturers}
                />
              </Suspense>
            </div>
          </div>

          <InfiniteProjectsList
            initialProjects={projects}
            initialHasMore={hasMore}
            initialTotal={total}
            architectId={architectId}
            manufacturerId={manufacturerId}
          />
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />

      <Separator />
    </div>
  );
}
