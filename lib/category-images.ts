import type { ProjectCardData, SanityImage } from '@/lib/sanity';

export interface CategoryPhoto {
  image?: SanityImage;
  alt: string;
}

interface Bucket {
  /** Key the caller will look the result up by. */
  key: string;
  /** Human label, used to build the alt text. */
  label: string;
  /** Manufacturer names whose projects can represent this bucket. */
  sources: string[];
}

/**
 * Sanity carries no photo per product category, so each one borrows the cover
 * of a project that used one of its manufacturers. That keeps the grids on real
 * work instead of placeholders.
 *
 * Allocation runs scarcity-first: buckets with the fewest candidate projects
 * choose before buckets spoiled for choice. A naive first-come pass strands the
 * narrow categories, because a project like LifeServe Blood Center qualifies for
 * several buckets and the first one to run would take it. Acoustical Ceilings
 * has exactly one candidate in the whole dataset, so it has to pick first.
 *
 * Within a bucket, projects are already newest-first. An unclaimed project is
 * always preferred so neighbouring cards don't repeat a building, but a claimed
 * one is reused rather than falling back to a placeholder.
 */
export function assignPhotos(
  buckets: Bucket[],
  projects: ProjectCardData[]
): Record<string, CategoryPhoto> {
  const candidatesFor = (sources: string[]) => {
    const names = new Set(sources.map((source) => source.trim()));
    return projects.filter(
      (project) =>
        project.coverImage &&
        (project.manufacturers ?? []).some((manufacturer) =>
          names.has(manufacturer.name.trim())
        )
    );
  };

  const pools = new Map(
    buckets.map((bucket) => [bucket.key, candidatesFor(bucket.sources)])
  );

  const claimed = new Set<string>();
  const result: Record<string, CategoryPhoto> = {};

  const order = [...buckets].sort(
    (a, b) => (pools.get(a.key)?.length ?? 0) - (pools.get(b.key)?.length ?? 0)
  );

  for (const bucket of order) {
    const pool = pools.get(bucket.key) ?? [];
    const project =
      pool.find((candidate) => !claimed.has(candidate._id)) ?? pool[0];

    if (project) {
      claimed.add(project._id);
      result[bucket.key] = {
        image: project.coverImage,
        alt: `${bucket.label} - ${project.title.trim()}`,
      };
    } else {
      result[bucket.key] = { alt: bucket.label };
    }
  }

  return result;
}

/** Collapses several categories' manufacturer lists into one source list. */
export function sourcesForGroup(
  categorySlugs: string[],
  photoSources: Record<string, string[]>
): string[] {
  return Array.from(
    new Set(categorySlugs.flatMap((slug) => photoSources[slug] ?? []))
  );
}
