'use client';

import { FilterBar, type FilterOption } from '@/components/filter-bar';
import { ProjectCard } from '@/components/project-card';
import { revealDelay } from '@/lib/reveal';
import type { ProjectCardData } from '@/lib/sanity';
import { useUrlFilter } from '@/lib/use-url-filter';

interface ProjectGridProps {
  projects: ProjectCardData[];
  /** Manufacturer chips, keyed by manufacturer slug. */
  manufacturers: FilterOption[];
}

export function ProjectGrid({ projects, manufacturers }: ProjectGridProps) {
  const keys = ['all', ...manufacturers.map((manufacturer) => manufacturer.key)];
  const [active, setActive] = useUrlFilter('manufacturer', keys);

  const visible =
    active === 'all'
      ? projects
      : projects.filter((project) =>
          (project.manufacturers ?? []).some(
            (manufacturer) => manufacturer.slug?.current === active
          )
        );

  return (
    <>
      <section className="container-page pb-6">
        <FilterBar
          label="Manufacturer"
          options={[{ key: 'all', label: 'All' }, ...manufacturers]}
          active={active}
          onChange={setActive}
          count={`${visible.length} of ${projects.length}`}
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
            No projects yet for that manufacturer.
          </p>
        )}
      </section>
    </>
  );
}
