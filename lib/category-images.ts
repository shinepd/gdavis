import type { ManufacturerCategory, ProjectCardData, SanityImage } from '@/lib/sanity';

/**
 * Sanity does not carry a photo per product category, so each category borrows
 * the cover shot of the most recent project that used one of its manufacturers.
 * That keeps the product grid on real, relevant work instead of placeholders.
 */
export function buildCategoryImages(
  categories: ManufacturerCategory[],
  projects: ProjectCardData[]
): Record<string, { image?: SanityImage; alt: string }> {
  const used = new Set<string>();
  const result: Record<string, { image?: SanityImage; alt: string }> = {};

  for (const category of categories) {
    const names = new Set(
      category.manufacturers.map((manufacturer) => manufacturer.name.trim())
    );

    // Prefer a project not already claimed by another category so the grid
    // doesn't repeat the same photo; fall back to the best match if it must.
    const matches = projects.filter(
      (project) =>
        project.coverImage &&
        (project.manufacturers ?? []).some((manufacturer) =>
          names.has(manufacturer.name.trim())
        )
    );

    const project = matches.find((match) => !used.has(match._id)) ?? matches[0];

    if (project) {
      used.add(project._id);
      result[category.slug] = {
        image: project.coverImage,
        alt: `${category.title} - ${project.title.trim()}`,
      };
    } else {
      result[category.slug] = { alt: category.title };
    }
  }

  return result;
}
