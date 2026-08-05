import Link from 'next/link';

import { ImageSlot } from '@/components/image-slot';
import { imageUrl, type ProjectCardData } from '@/lib/sanity';
import { projectMeta } from '@/lib/site';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: ProjectCardData;
  /** Image crop - the grids use 4/3, the home rail 4/5, the products rail 3/4. */
  aspect?: '4 / 3' | '4 / 5' | '3 / 4';
  size?: 'sm' | 'md';
  /** Hides the mono manufacturer line (the home rail runs without it). */
  showManufacturers?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const CROPS = {
  '4 / 3': [800, 600],
  '4 / 5': [720, 900],
  '3 / 4': [720, 960],
} as const;

export function ProjectCard({
  project,
  aspect = '4 / 3',
  size = 'md',
  showManufacturers = true,
  className,
  style,
}: ProjectCardProps) {
  const [width, height] = CROPS[aspect];
  const manufacturers = (project.manufacturers ?? [])
    .map((manufacturer) => manufacturer.name.trim())
    .filter(Boolean);

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className={cn('group flex flex-col gap-3.5 hover:text-ink', className)}
      style={style}
    >
      <ImageSlot
        src={imageUrl(project.coverImage, width, height)}
        alt={project.title.trim()}
        aspect={aspect}
        caption="project photo"
        sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 340px"
        className="transition-opacity duration-200 group-hover:opacity-90"
      />
      <div>
        <div
          className={cn(
            'font-semibold tracking-[-0.018em] transition-colors group-hover:text-brand',
            size === 'md' ? 'text-[19px] leading-[1.2]' : 'text-[16px]'
          )}
        >
          {project.title.trim()}
        </div>
        <div
          className={cn(
            'mt-1 text-ink-3',
            size === 'md' ? 'text-[14px]' : 'text-[13px]'
          )}
        >
          {projectMeta(project)}
        </div>
        {showManufacturers && manufacturers.length > 0 && (
          <div className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-brand">
            {manufacturers.join(' · ')}
          </div>
        )}
      </div>
    </Link>
  );
}
