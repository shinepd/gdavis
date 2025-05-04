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
  products: Product[];
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
      products[]->{
        _id,
        name,
        slug,
        description,
        image,
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
      products[]->{
        _id,
        name,
        slug,
        description,
        image,
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
    *[_type == "manufacturer"] | order(name asc) {
      _id,
      name,
      slug,
      logo,
      description,
      website
    }
  `);
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
