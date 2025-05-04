import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Project, urlFor } from '@/lib/sanity';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Format the date if available
  const formattedDate = project.projectDate
    ? format(new Date(project.projectDate), 'yyyy')
    : '';

  return (
    <div className="group">
      <Link href={`/projects/${project.slug.current}`} className="block">
        <div className="overflow-hidden rounded-lg mb-4">
          {project.coverImage && project.coverImage.asset && (
            <div className="aspect-[4/3] relative w-full">
              <Image
                src={urlFor(project.coverImage).width(600).height(450).url()}
                alt={project.title}
                width={600}
                height={450}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>
        <h3 className="text-xl font-heading uppercase tracking-wide mb-2">
          {project.title}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {project.location || 'Location not specified'}
          </span>
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>

        {/* Display the architects */}
        {project.architects && project.architects.length > 0 && (
          <p className="text-sm text-muted-foreground mb-3">
            Architects: {project.architects.map((a) => a.name).join(', ')}
          </p>
        )}

        {/* Display product categories */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.products &&
            project.products.map((product) => (
              <span
                key={product._id}
                className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground"
              >
                {product.category || product.name}
              </span>
            ))}
        </div>
      </Link>
    </div>
  );
}
