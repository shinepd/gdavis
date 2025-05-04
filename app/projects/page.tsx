import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { getAllProjects } from '@/lib/sanity';
import { ProjectCard } from '@/components/project-card';
import { CtaSection } from '@/components/sections/cta-section';

export const metadata: Metadata = {
  title: 'Projects | G. Davis & Associates',
  description:
    'Explore our showcase of projects featuring high-quality architectural products from G. Davis & Associates.',
};

// This function is called at build time to generate the static page
export default async function ProjectsPage() {
  const projects = await getAllProjects();

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          {projects.length > 9 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Projects
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />

      <Separator />
    </div>
  );
}
