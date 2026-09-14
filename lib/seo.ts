import type { Metadata } from 'next';

import { SITE } from './site';

/**
 * Builds a page's metadata with the site-wide social fields folded back in.
 *
 * Next merges `metadata` shallowly: a segment declaring its own `openGraph`
 * replaces the root object outright rather than extending it. Setting so much
 * as an og:title on a page therefore drops `siteName`, `locale`, and `type` -
 * which is what had happened to every page here except Home. Composing through
 * this helper keeps them, and keeps the Twitter card pointed at whatever image
 * the Open Graph tags use instead of falling back to the generic site card.
 *
 * The default card is named explicitly rather than inherited, because the
 * inheritance is not uniform: a `page.tsx` that declares any `openGraph` field
 * suppresses the file-based `app/opengraph-image.png`, while a `layout.tsx`
 * doing the same still picks it up. Relying on that would leave two of the
 * five marketing pages with no social card and no obvious reason why.
 */
/**
 * Google renders about 160 characters of a description and drops the rest, so
 * anything longer is wasted at best and cut mid-word at worst. Trims back to
 * the last sentence that fits, or failing that the last whole word.
 */
export function clampDescription(text: string, limit = 158) {
  const clean = text.replace(/\s+/g, ' ').trim();

  if (clean.length <= limit) return clean;

  const head = clean.slice(0, limit);
  const sentence = Math.max(
    head.lastIndexOf('. '),
    head.lastIndexOf('! '),
    head.lastIndexOf('? '),
  );

  // Only cut at a sentence when enough of one survives to read as a summary
  // rather than a fragment.
  if (sentence > limit * 0.6) return head.slice(0, sentence + 1);

  const word = head.lastIndexOf(' ');

  return `${(word > 0 ? head.slice(0, word) : head).replace(/[,;:]$/, '')}…`;
}

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  images,
}: {
  /** Page title without the firm suffix; the root title template adds it. */
  title: string;
  description: string;
  /** Root-relative path, used for both the canonical URL and og:url. */
  path: string;
  type?: 'website' | 'article';
  images?: string[];
}): Metadata {
  // og:title carries the firm name because the root `title.template` applies
  // only to the document title, never to the social tags.
  const socialTitle = `${title} | ${SITE.name}`;
  const summary = clampDescription(description);
  const ogImages = images?.length ? images : ['/opengraph-image.png'];
  const twitterImages = images?.length ? images : ['/twitter-image.png'];

  return {
    title,
    description: summary,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE.name,
      locale: 'en_US',
      title: socialTitle,
      description: summary,
      url: path,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: summary,
      images: twitterImages,
    },
  };
}
