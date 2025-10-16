import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

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
    *[_type == "project"] | order(publishedAt desc) {
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

// Function to fetch paginated projects
export async function getPaginatedProjects(
  page: number = 0,
  pageSize: number = 9
): Promise<{ projects: Project[]; hasMore: boolean; total: number }> {
  const start = page * pageSize;
  const end = start + pageSize;

  // Fetch projects with pagination
  const projects = await client.fetch(
    `
    *[_type == "project"] | order(publishedAt desc) [$start...$end] {
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
    { start, end }
  );

  // Get total count
  const total = await client.fetch(`count(*[_type == "project"])`);

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

// Function to fetch manufacturers grouped by category
export async function getManufacturersByCategory(): Promise<
  Array<{
    id: string;
    title: string;
    description?: string;
    manufacturers: Manufacturer[];
  }>
> {
  // Fetch all manufacturers with status "current"
  const manufacturers = await client.fetch(`
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

  // Map category slugs to readable titles and descriptions
  const categoryInfo: Record<string, { title: string; description: string }> = {
    'architectural-glass': {
      title: 'Architectural Glass',
      description:
        'Sleek, versatile glass systems for light, visibility, and dynamic space division with modern appeal.',
    },
    'terracotta-rainscreens-and-cladding': {
      title: 'Terracotta Rainscreens and Cladding',
      description:
        'Natural, sustainable facades for a distinctive, warm aesthetic with excellent thermal performance and durability.',
    },
    'wood-ceilings-and-wall-panels': {
      title: 'Wood Ceilings and Wall Panels',
      description:
        'Warm, natural wood systems for a premium aesthetic that enhances biophilic design and acoustic comfort.',
    },
    'wood-rainscreens': {
      title: 'Wood Rainscreens',
      description:
        'Elegant wood siding systems that combine natural beauty with a ventilated facade for maximum longevity and curb appeal.',
    },
    'metal-rainscreens-and-cladding': {
      title: 'Metal Rainscreens and Cladding',
      description:
        'Modern metal systems offering a sharp, high-tech facade that is both highly durable and resistant to the elements.',
    },
    'metal-ceilings': {
      title: 'Metal Ceilings',
      description:
        'Durable, cleanable ceiling systems for a sleek, modern finish that excels in high-traffic and specialized environments.',
    },
    'concrete-rainscreens': {
      title: 'Concrete Rainscreens',
      description:
        'Durable, non-combustible facade systems offering a robust, low-maintenance aesthetic with superior weather protection.',
    },
    'acoustical-ceilings': {
      title: 'Acoustical Ceilings',
      description:
        'High-performance ceilings engineered to optimize sound quality and control noise in any commercial space.',
    },
    'composite-stone': {
      title: 'Composite Stone',
      description:
        'Lightweight, high-strength panels that deliver the look of natural stone for interior and exterior applications without the weight.',
    },
    'zinc-rainscreens-and-cladding': {
      title: 'Zinc Rainscreens and Cladding',
      description:
        'Premium metal facades known for their self-healing properties and distinctive patina that matures beautifully over time.',
    },
  };

  // Group manufacturers by category
  const grouped: Record<string, Manufacturer[]> = manufacturers.reduce(
    (acc: Record<string, Manufacturer[]>, manufacturer: Manufacturer) => {
      const category = manufacturer.category || 'uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(manufacturer);
      return acc;
    },
    {} as Record<string, Manufacturer[]>
  );

  // Convert to array format and sort alphabetically by title
  return Object.entries(grouped)
    .map(([id, manufacturers]) => ({
      id,
      title: categoryInfo[id]?.title || id,
      description: categoryInfo[id]?.description,
      manufacturers,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
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
