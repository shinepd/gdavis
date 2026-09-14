import { GEORGE, SITE, SITE_URL } from '@/lib/site';

/**
 * JSON-LD for search engines. Two shapes, deliberately:
 *
 * `OrganizationSchema` runs site-wide and establishes who the site belongs to,
 * which is what earns a knowledge panel and lets Google tie the site to the
 * firm's existing directory listings. `LocalBusinessSchema` carries the full
 * NAP and service area and sits only on Contact, where that information is
 * actually on the page - structured data that a visitor cannot see is the fast
 * way to lose the markup entirely.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own static content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE.name,
        alternateName: 'G. Davis and Associates',
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        image: `${SITE_URL}/opengraph-image.png`,
        description: SITE.tagline,
        telephone: GEORGE.phone,
        email: GEORGE.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.state,
          postalCode: SITE.address.zip,
          addressCountry: 'US',
        },
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: SITE.name,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image.png`,
        description: SITE.tagline,
        telephone: GEORGE.phone,
        email: GEORGE.email,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.state,
          postalCode: SITE.address.zip,
          addressCountry: 'US',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
            ],
            opens: '08:00',
            closes: '17:00',
          },
        ],
        areaServed: ['Kansas', 'Missouri', 'Iowa', 'Nebraska'].map((name) => ({
          '@type': 'State',
          name,
        })),
      }}
    />
  );
}

/** Breadcrumb trail for a project page, so search results show the path. */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.path}`,
        })),
      }}
    />
  );
}
