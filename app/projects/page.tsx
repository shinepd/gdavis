import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { getPaginatedProjects } from '@/lib/sanity';
import { InfiniteProjectsList } from '@/components/infinite-projects-list';
import { CtaSection } from '@/components/sections/cta-section';

export const metadata: Metadata = {
  title: 'Projects | G. Davis & Associates',
  description:
    'Explore our showcase of projects featuring high-quality architectural products from G. Davis & Associates.',
};

// This function is called at build time to generate the static page
export default async function ProjectsPage() {
  // Fetch initial batch of projects (page 0, 9 items)
  const { projects, hasMore, total } = await getPaginatedProjects(0, 9);

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

              <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm">
                  All Projects
                </Button>
                {[
                  'Commercial',
                  'Residential',
                  'Institutional',
                  'Hospitality',
                ].map((category) => (
                  <Button key={category} variant="outline" size="sm">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <InfiniteProjectsList
            initialProjects={projects}
            initialHasMore={hasMore}
            initialTotal={total}
          />
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />

      <Separator />
    </div>
  );
}
