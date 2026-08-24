'use client';

import { FilterBar, type FilterOption } from '@/components/filter-bar';
import { ProjectCard } from '@/components/project-card';
import { revealDelay } from '@/lib/reveal';
import type { ProjectCardData } from '@/lib/sanity';
import { useUrlFilter } from '@/lib/use-url-filter';

/** A manufacturer chip, plus the material it belongs to so it can be scoped. */
export interface ManufacturerOption extends FilterOption {
  material?: string;
}

interface ProjectGridProps {
  projects: ProjectCardData[];
  /** Manufacturer chips, keyed by manufacturer slug. */
  manufacturers: ManufacturerOption[];
  /** Material titles keyed by category slug, for the scope chip. */
  materialTitles: Record<string, string>;
}

/**
 * The filtered project grid, driven by two URL params.
 *
 * `?material=composite-stone` is the wider scope, and it is how the material
 * cards on Products link here. It narrows the manufacturer chips to the lines
 * in that material, so the two filters read as one path rather than two
 * competing dimensions. `?manufacturer=petrarch` then picks a single line.
 */
export function ProjectGrid({
  projects,
  manufacturers,
  materialTitles,
}: ProjectGridProps) {
  const materialKeys = Object.keys(materialTitles);
  const [material, setMaterial] = useUrlFilter('material', materialKeys, '');

  const scoped = material
    ? manufacturers.filter(
        (manufacturer) => manufacturer.material === material
      )
    : manufacturers;

  // Only the in-scope chips are valid keys, so a manufacturer left in the URL
  // from a wider view resolves back to "all" instead of showing nothing.
  const keys = ['all', ...scoped.map((manufacturer) => manufacturer.key)];
  const [active, setActive] = useUrlFilter('manufacturer', keys);

  const visible = projects.filter((project) => {
    const lines = project.manufacturers ?? [];

    if (material && !lines.some((line) => line.category === material)) {
      return false;
    }

    return (
      active === 'all' || lines.some((line) => line.slug?.current === active)
    );
  });

  return (
    <>
      <section className="container-page pb-6">
        <FilterBar
          label="Manufacturer"
          options={[{ key: 'all', label: 'All' }, ...scoped]}
          active={active}
          onChange={setActive}
          count={`${visible.length} of ${projects.length}`}
          scope={
            material
              ? {
                  name: 'Material',
                  label: materialTitles[material],
                  onClear: () => setMaterial(''),
                }
              : undefined
          }
        />
      </section>

      <section className="container-page">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(330px,100%),1fr))] gap-x-5 gap-y-[26px]">
          {visible.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              className="rv"
              style={revealDelay(index, 3)}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="py-16 text-center text-[15px] text-ink-3">
            No projects yet for that {material && active === 'all' ? 'material' : 'manufacturer'}.
          </p>
        )}
      </section>
    </>
  );
}
