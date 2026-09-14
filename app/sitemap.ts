import type { MetadataRoute } from 'next';

import { getProjectSitemapEntries } from '@/lib/sanity';
import { SITE_URL } from '@/lib/site';

/**
 * The five marketing pages plus one entry per project.
 *
 * Priorities follow how the firm sells: Products and Projects are what an
 * architect searches for and what the marketing pages funnel toward, so they
 * outrank About and Contact.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectSitemapEntries();
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${SITE_URL}/products`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  return [
    ...pages,
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
