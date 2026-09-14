import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/**
 * Everything here is public marketing content, so the only rule is where the
 * sitemap lives. The Sanity Studio is a separate deployment and is not proxied
 * through this app, so there is nothing to disallow.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
