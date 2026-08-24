import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

import { categoryTitle } from '@/lib/site';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
});

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

/**
 * Resolves a cropped, hotspot-aware URL for a Sanity image, returning
 * `undefined` when the document has no image so callers can fall back to the
 * design's striped placeholder.
 */
export function imageUrl(
  source: SanityImage | undefined,
  width: number,
  height?: number
): string | undefined {
  if (!source?.asset?._ref) return undefined;

  const image = urlFor(source).width(width).auto('format').quality(80);
  return (height ? image.height(height).fit('crop') : image).url();
}

// TypeScript interfaces for Sanity schemas
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  caption?: string;
  alt?: string;
}

export interface Architect {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  bio?: string;
  image?: SanityImage;
}

export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: SanityImage;
  category?: string;
  manufacturer?: Manufacturer;
}

export interface ProductCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  products: Product[];
}

export interface Manufacturer {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  logo?: SanityImage;
  description?: string;
  website?: string;
  category?: string;
  status?: 'current' | 'past';
}

export interface BlockContent {
  _type: 'block' | 'image';
  [key: string]: unknown;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  architects: Architect[];
  manufacturers: Manufacturer[];
  coverImage: SanityImage;
  projectImages?: SanityImage[];
  description: BlockContent[];
  projectDate: string;
  publishedAt: string;
  location?: string;
}

// Function to fetch all projects
export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(`
    *[_type == "project"] | order(projectDate desc) {
      _id,
      title,
      slug,
      architects[]->{
        _id,
        name,
        slug,
        bio,
        image
      },
      manufacturers[]->{
        _id,
        name,
        slug,
        logo,
        description,
        website,
        category
      },
      coverImage,
      projectImages,
      description,
      projectDate,
      publishedAt,
      location
    }
  `);
}

/** The subset of a project needed to render a card in a grid. */
export interface ProjectCardData {
  _id: string;
  title: string;
  slug: { current: string };
  location?: string;
  projectDate?: string;
  architects?: { name: string }[];
  manufacturers?: {
    _id: string;
    name: string;
    slug?: { current: string };
    /** Category slug, used to filter the Projects grid by material. */
    category?: string;
  }[];
  coverImage?: SanityImage;
}

/**
 * Every project, newest first, with just the fields the card grids need.
 * The Projects index filters this list on the client so the manufacturer
 * counter stays live and a filtered view is shareable via the URL.
 */
export async function getProjectCards(): Promise<ProjectCardData[]> {
  return client.fetch(`
    *[_type == "project" && defined(slug.current)] | order(projectDate desc) {
      _id,
      title,
      slug,
      location,
      projectDate,
      architects[]->{ name },
      manufacturers[]->{ _id, name, slug, category },
      coverImage
    }
  `);
}

// Function to fetch paginated projects with optional filters
export async function getPaginatedProjects(
  page: number = 0,
  pageSize: number = 9,
  filters?: { architectId?: string; manufacturerId?: string }
): Promise<{ projects: Project[]; hasMore: boolean; total: number }> {
  const start = page * pageSize;
  const end = start + pageSize;

  // Build filter conditions
  const conditions = ['_type == "project"'];
  const params: Record<string, unknown> = { start, end };

  if (filters?.architectId) {
    conditions.push('references($architectId)');
    params.architectId = filters.architectId;
  }

  if (filters?.manufacturerId) {
    conditions.push('references($manufacturerId)');
    params.manufacturerId = filters.manufacturerId;
  }

  const filterQuery = conditions.join(' && ');

  // Fetch projects with pagination and filters
  const projects = await client.fetch(
    `
    *[${filterQuery}] | order(projectDate desc) [$start...$end] {
      _id,
      title,
      slug,
      architects[]->{
        _id,
        name,
        slug,
        bio,
        image
      },
      manufacturers[]->{
        _id,
        name,
        slug,
        logo,
        description,
        website,
        category
      },
      coverImage,
      projectImages,
      description,
      projectDate,
      publishedAt,
      location
    }
  `,
    params
  );

  // Get total count with same filters
  const total = await client.fetch(
    `count(*[${filterQuery}])`,
    params
  );

  return {
    projects,
    hasMore: end < total,
    total,
  };
}

// Function to fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project> {
  const data = await client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      architects[]->{
        _id,
        name,
        slug,
        bio,
        image
      },
      manufacturers[]->{
        _id,
        name,
        slug,
        logo,
        description,
        website,
        category
      },
      coverImage,
      projectImages,
      description,
      projectDate,
      publishedAt,
      location
    }
  `,
    { slug }
  );

  return data;
}

// Function to fetch all project slugs for static paths
export async function getAllProjectSlugs(): Promise<string[]> {
  const data = await client.fetch(`
    *[_type == "project"].slug.current
  `);

  return data;
}

// Function to fetch all product categories with their products
export async function getAllProductCategories(): Promise<ProductCategory[]> {
  return client.fetch(`
    *[_type == "productCategory"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      products[]->{
        _id,
        name,
        slug,
        description,
        image,
        category,
        manufacturer->{
          _id,
          name,
          slug
        }
      }
    }
  `);
}

// Function to fetch all manufacturers
export async function getAllManufacturers(): Promise<Manufacturer[]> {
  return client.fetch(`
    *[_type == "manufacturer" && status == "current"] | order(name asc) {
      _id,
      name,
      slug,
      logo,
      description,
      website,
      status,
      category
    }
  `);
}

// Function to fetch all architects
export async function getAllArchitects(): Promise<Architect[]> {
  return client.fetch(`
    *[_type == "architect"] | order(name asc) {
      _id,
      name,
      slug,
      bio,
      image
    }
  `);
}

// Function to fetch filter options (architects and manufacturers that have projects)
export async function getProjectFilterOptions(): Promise<{
  architects: Array<{ _id: string; name: string }>;
  manufacturers: Array<{ _id: string; name: string }>;
}> {
  const [architects, manufacturers] = await Promise.all([
    client.fetch(`
      *[_type == "architect" && count(*[_type == "project" && references(^._id)]) > 0] | order(name asc) {
        _id,
        name
      }
    `),
    client.fetch(`
      *[_type == "manufacturer" && count(*[_type == "project" && references(^._id)]) > 0] | order(name asc) {
        _id,
        name
      }
    `),
  ]);

  return { architects, manufacturers };
}

export interface ManufacturerCategory {
  /** The category slug stored on each manufacturer, e.g. `metal-ceilings`. */
  slug: string;
  title: string;
  manufacturers: Manufacturer[];
}

/**
 * Groups the currently represented manufacturers by their category slug.
 * Display copy for each category lives in `lib/site.ts` (`CATEGORY_META`);
 * anything Sanity has that isn't described there falls back to a title derived
 * from the slug, so a new category still renders.
 */
export async function getManufacturersByCategory(): Promise<
  ManufacturerCategory[]
> {
  const manufacturers: Manufacturer[] = await client.fetch(`
    *[_type == "manufacturer" && status == "current" && defined(category)] | order(name asc) {
      _id,
      name,
      slug,
      logo,
      description,
      website,
      status,
      category
    }
  `);

  const grouped = new Map<string, Manufacturer[]>();
  for (const manufacturer of manufacturers) {
    const category = manufacturer.category as string;
    grouped.set(category, [...(grouped.get(category) ?? []), manufacturer]);
  }

  return Array.from(grouped, ([slug, group]) => ({
    slug,
    title: categoryTitle(slug),
    manufacturers: group,
  })).sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Every manufacturer name grouped by category, regardless of status.
 *
 * Used only to source representative photography: a building genuinely has a
 * discontinued line installed in it, so a past manufacturer's project is a fair
 * photo for that category even though the card lists current lines only. This
 * is what keeps Acoustical Ceilings from falling back to a placeholder, since
 * its one current manufacturer has no projects yet.
 */
export async function getCategoryPhotoSources(): Promise<
  Record<string, string[]>
> {
  const manufacturers: { name: string; category: string }[] = await client.fetch(`
    *[_type == "manufacturer" && defined(category)] {
      name,
      category
    }
  `);

  const sources: Record<string, string[]> = {};
  for (const manufacturer of manufacturers) {
    const name = manufacturer.name.trim();
    if (!name) continue;
    sources[manufacturer.category] = [
      ...(sources[manufacturer.category] ?? []),
      name,
    ];
  }

  return sources;
}

// Function to fetch a single product category by slug
export async function getProductCategoryBySlug(
  slug: string
): Promise<ProductCategory> {
  const data = await client.fetch(
    `
    *[_type == "productCategory" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      products[]->{
        _id,
        name,
        slug,
        description,
        image,
        category,
        manufacturer->{
          _id,
          name,
          slug
        }
      }
    }
  `,
    { slug }
  );

  return data;
}
