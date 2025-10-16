import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getAllProjectSlugs, getProjectBySlug, urlFor } from '@/lib/sanity';
import { PortableText } from '@/components/portable-text';
import { CtaSection } from '@/components/sections/cta-section';

// Generate static paths for all projects
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | G. Davis & Associates',
      description: 'The requested project could not be found.',
    };
  }

  // Create a description fallback
  let description =
    'View details about this architectural project by G. Davis & Associates.';

  // Try to extract text from the first block
  if (
    project.description &&
    project.description[0] &&
    typeof project.description[0] === 'object' &&
    'children' in project.description[0] &&
    Array.isArray(project.description[0].children) &&
    project.description[0].children[0] &&
    'text' in project.description[0].children[0]
  ) {
    description =
      (project.description[0].children[0].text as string) || description;
  }

  return {
    title: `${project.title} | G. Davis & Associates`,
    description,
    openGraph: {
      images: project.coverImage
        ? [urlFor(project.coverImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectDate = project.projectDate
    ? format(new Date(project.projectDate), 'MMMM yyyy')
    : '';

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <Link
                  href="/projects"
                  className="text-primary hover:underline inline-flex items-center mb-4"
                >
                  ← Back to Projects
                </Link>
                <h1 className="font-heading uppercase tracking-wide text-3xl md:text-4xl lg:text-5xl mb-2">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {project.manufacturers?.map((manufacturer) => (
                    <Badge key={manufacturer._id} variant="outline">
                      {manufacturer.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {project.location && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium">Location:</span>
                    <span>{project.location}</span>
                  </div>
                )}
                {projectDate && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium">Completed:</span>
                    <span>{projectDate}</span>
                  </div>
                )}
                {project.architects.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium">Architects:</span>
                    <div>
                      {project.architects.map((architect, index) => (
                        <span key={architect._id}>
                          {architect.name}
                          {index < project.architects.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              {project.coverImage && (
                <div className="aspect-[4/3] relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(project.coverImage)
                      .width(800)
                      .height(600)
                      .url()}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full rounded-lg"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {project.description && (
              <PortableText value={project.description} />
            )}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      {project.projectImages && project.projectImages.length > 0 && (
        <section className="w-full py-12 md:py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <h2 className="font-heading uppercase tracking-wide text-2xl md:text-3xl mb-8 text-center">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.projectImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] relative w-full rounded-lg overflow-hidden"
                >
                  <Image
                    src={urlFor(image).width(600).height(450).url()}
                    alt={image.alt || `${project.title} - Image ${index + 1}`}
                    width={600}
                    height={450}
                    className="object-cover w-full h-full rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Manufacturers Used */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading uppercase tracking-wide text-2xl md:text-3xl mb-8 text-center">
            Manufacturers Used in This Project
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.manufacturers?.map((manufacturer) => (
              <div
                key={manufacturer._id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {manufacturer.logo && (
                  <div className="aspect-square relative w-full mb-4 rounded overflow-hidden">
                    <Image
                      src={urlFor(manufacturer.logo)
                        .width(300)
                        .height(300)
                        .url()}
                      alt={manufacturer.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <h3 className="font-medium text-lg mb-1">
                  {manufacturer.name}
                </h3>
                {manufacturer.category && (
                  <Badge variant="secondary" className="mb-2">
                    {manufacturer.category}
                  </Badge>
                )}
                {manufacturer.description && (
                  <p className="text-muted-foreground text-sm mt-2">
                    {manufacturer.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection
        title="Interested in Using Similar Products?"
        description="Contact us to discuss how we can help you with your next project using high-quality architectural products."
      />

      <Separator />
    </div>
  );
}
