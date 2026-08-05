/**
 * Content of record for the site redesign: company details, navigation, and the
 * editorial copy that sits alongside the Sanity-managed product categories.
 *
 * Manufacturers, projects, and architects all come from Sanity. What lives here
 * is presentation metadata that Sanity does not model - the per-category blurb,
 * application tags, and which filter groups a category belongs to.
 */

export const SITE = {
  name: 'G. Davis & Associates',
  tagline:
    "Finding the perfect architectural element shouldn't be the hardest part of your design.",
  address: {
    street: '12004 Pawnee Lane',
    city: 'Leawood',
    state: 'KS',
    zip: '66209',
  },
  hours: 'Mon–Fri, 8:00–5:00 CT',
  territory: 'KS · MO · IA',
} as const;

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
] as const;

export interface TeamMember {
  name: string;
  role: string;
  discipline?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  blurb?: string;
  photo?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'George Davis',
    role: 'Founder · Exteriors',
    discipline: 'Rainscreens, cladding, terracotta, metal',
    phone: '(913) 231-8071',
    phoneHref: 'tel:9132318071',
    email: 'george@gdavisassociates.com',
    photo: '/images/team/george.png',
  },
  {
    name: 'Maddie Shine',
    role: 'Sales · Interiors',
    discipline: 'Ceilings, acoustics, wood and glass systems',
    phone: '(913) 744-0191',
    phoneHref: 'tel:9137440191',
    email: 'maddie@gdavisassociates.com',
    photo: '/images/team/maddie.png',
  },
  {
    name: 'Makensi McDonald',
    role: 'Marketing',
    blurb: 'Lunch-and-learns, CEU scheduling, and sample logistics.',
  },
];

export const GEORGE = TEAM[0];
export const MADDIE = TEAM[1];

/** The four chips on the Products filter bar. */
export const PRODUCT_FILTERS = [
  { key: 'all', label: 'All lines' },
  { key: 'ceilings', label: 'Ceilings' },
  { key: 'facades', label: 'Rainscreens & cladding' },
  { key: 'interiors', label: 'Interior walls' },
  { key: 'glass', label: 'Glass' },
] as const;

export type ProductFilterKey = (typeof PRODUCT_FILTERS)[number]['key'];

export interface CategoryMeta {
  /** Display title, overriding the slug-derived one. */
  title: string;
  /** Two-line punchy description shown on the product card. */
  blurb: string;
  /** Application tags - Interior / Exterior / Ceiling / Wall / Soffit / Roof. */
  tags: string[];
  /** Filter groups this category belongs to; a category can be in several. */
  groups: Exclude<ProductFilterKey, 'all'>[];
}

/** Keyed by the `category` slug stored on each Sanity manufacturer. */
export const CATEGORY_META: Record<string, CategoryMeta> = {
  'acoustical-ceilings': {
    title: 'Acoustical Ceilings',
    blurb:
      'Quiet the open plan. PET felt systems that hit the NRC your consultant asked for without looking like a ceiling tile.',
    tags: ['Interior', 'Ceiling', 'Wall'],
    groups: ['ceilings'],
  },
  'architectural-glass': {
    title: 'Architectural Glass',
    blurb:
      'Daylight without sightlines. Channel and cast glass that divides space and still reads as one continuous plane.',
    tags: ['Interior', 'Exterior', 'Wall'],
    groups: ['glass', 'facades'],
  },
  'composite-stone': {
    title: 'Composite Stone',
    blurb:
      'The look of quarried stone at a fraction of the dead load - thin panels that keep your structural budget where you want it.',
    tags: ['Interior', 'Exterior', 'Wall'],
    groups: ['facades', 'interiors'],
  },
  'metal-ceilings': {
    title: 'Metal Ceilings',
    blurb:
      'Built for airports, labs, and kitchens. Wipe-down panels and access systems that survive the way a building is actually used.',
    tags: ['Interior', 'Exterior soffit', 'Ceiling'],
    groups: ['ceilings'],
  },
  'metal-rainscreens-and-cladding': {
    title: 'Metal Rainscreens & Cladding',
    blurb:
      'Crisp reveals, deep shadow lines, and a drained cavity behind them. Formed to your elevation, not to a catalog page.',
    tags: ['Exterior', 'Wall'],
    groups: ['facades'],
  },
  'terracotta-rainscreens-and-cladding': {
    title: 'Terracotta Rainscreens & Cladding',
    blurb:
      "Fired clay in the color you glazed it. Warm, breathable, and still on the building in fifty years.",
    tags: ['Exterior', 'Wall', 'Roof'],
    groups: ['facades'],
  },
  'wood-ceilings-and-wall-panels': {
    title: 'Wood Ceilings & Wall Panels',
    blurb:
      'The detail people photograph. Real veneer slat and linear systems with acoustic backing and a Class A rating.',
    tags: ['Interior', 'Ceiling', 'Wall'],
    groups: ['ceilings', 'interiors'],
  },
  'wood-rainscreens': {
    title: 'Wood Rainscreens',
    blurb:
      "Timber warmth that holds its finish. Ventilated facade panels engineered so the wood doesn't have to be a maintenance line item.",
    tags: ['Exterior', 'Wall', 'Soffit'],
    groups: ['facades'],
  },
  'concrete-rainscreens': {
    title: 'Concrete Rainscreens',
    blurb:
      'Non-combustible facade panels with a raw, low-maintenance surface and serious weather performance.',
    tags: ['Exterior', 'Wall'],
    groups: ['facades'],
  },
  'zinc-rainscreens-and-cladding': {
    title: 'Zinc Rainscreens & Cladding',
    blurb:
      'A self-healing metal that earns its patina. Premium facades that keep improving after the punch list.',
    tags: ['Exterior', 'Wall', 'Roof'],
    groups: ['facades'],
  },
};

/** The six grouped category cards on the home page, mapped to Sanity categories. */
export interface HomeCategory {
  title: string;
  blurb: string;
  categorySlugs: string[];
  href: string;
}

export const HOME_CATEGORIES: HomeCategory[] = [
  {
    title: 'Ceilings',
    blurb:
      'Acoustical, metal, and wood systems - sound control and a finished plane in one package.',
    categorySlugs: [
      'acoustical-ceilings',
      'metal-ceilings',
      'wood-ceilings-and-wall-panels',
    ],
    href: '/products?filter=ceilings',
  },
  {
    title: 'Architectural Glass',
    blurb:
      'Channel and cast glass that brings in daylight and keeps sightlines out of it.',
    categorySlugs: ['architectural-glass'],
    href: '/products?filter=glass',
  },
  {
    title: 'Rainscreens & Cladding',
    blurb:
      'Metal, wood, terracotta, and stone facades with a drained, ventilated cavity behind them.',
    categorySlugs: [
      'metal-rainscreens-and-cladding',
      'terracotta-rainscreens-and-cladding',
      'wood-rainscreens',
    ],
    href: '/products?filter=facades',
  },
  {
    title: 'Natural Materials',
    blurb:
      'Real wood, fired clay, and composite stone for biophilic work that still passes code.',
    categorySlugs: [
      'terracotta-rainscreens-and-cladding',
      'wood-ceilings-and-wall-panels',
      'wood-rainscreens',
    ],
    href: '/products',
  },
  {
    title: 'Metal Systems',
    blurb:
      'Formed panels, soffits, and ceilings for the sharp reveals your elevation is drawn with.',
    categorySlugs: ['metal-rainscreens-and-cladding', 'metal-ceilings'],
    href: '/products',
  },
  {
    title: 'Specialty Materials',
    blurb:
      'Composite stone and engineered panels: unusual looks, ordinary maintenance budgets.',
    categorySlugs: ['composite-stone'],
    href: '/products?filter=interiors',
  },
];

/** Named contact paths, used on the Products page and the header CTA. */
export const CONTACT_PATHS = [
  {
    title: 'Request samples',
    detail: 'Physical chips and finish boards, shipped to your studio',
    subject: 'Sample request',
  },
  {
    title: 'Get spec & detail support',
    detail: 'Sections, attachment details, and budget numbers',
    subject: 'Spec support',
  },
  {
    title: 'Book a lunch-and-learn',
    detail: 'We bring lunch and the samples to your office',
    subject: 'Lunch-and-learn',
  },
] as const;

const STATE_ABBREVIATIONS: Record<string, string> = {
  alabama: 'AL',
  alaska: 'AK',
  arizona: 'AZ',
  arkansas: 'AR',
  california: 'CA',
  colorado: 'CO',
  connecticut: 'CT',
  delaware: 'DE',
  florida: 'FL',
  georgia: 'GA',
  hawaii: 'HI',
  idaho: 'ID',
  illinois: 'IL',
  indiana: 'IN',
  iowa: 'IA',
  kansas: 'KS',
  kentucky: 'KY',
  louisiana: 'LA',
  maine: 'ME',
  maryland: 'MD',
  massachusetts: 'MA',
  michigan: 'MI',
  minnesota: 'MN',
  mississippi: 'MS',
  missouri: 'MO',
  montana: 'MT',
  nebraska: 'NE',
  nevada: 'NV',
  'new hampshire': 'NH',
  'new jersey': 'NJ',
  'new mexico': 'NM',
  'new york': 'NY',
  'north carolina': 'NC',
  'north dakota': 'ND',
  ohio: 'OH',
  oklahoma: 'OK',
  oregon: 'OR',
  pennsylvania: 'PA',
  'rhode island': 'RI',
  'south carolina': 'SC',
  'south dakota': 'SD',
  tennessee: 'TN',
  texas: 'TX',
  utah: 'UT',
  vermont: 'VT',
  virginia: 'VA',
  washington: 'WA',
  'west virginia': 'WV',
  wisconsin: 'WI',
  wyoming: 'WY',
};

/**
 * Sanity stores locations inconsistently ("Iowa City, Iowa" and "Merriam, KS").
 * Normalize to "City, ST" so project meta lines read uniformly.
 */
export function formatLocation(location?: string): string {
  if (!location) return '';

  const parts = location
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 2) return parts.join(', ');

  const state = parts[parts.length - 1];
  const abbreviation = STATE_ABBREVIATIONS[state.toLowerCase()] ?? state;

  return [...parts.slice(0, -1), abbreviation].join(', ');
}

/** Builds the "City, ST · Year · Architect" meta line used on project cards. */
export function projectMeta(project: {
  location?: string;
  projectDate?: string;
  architects?: { name: string }[];
}): string {
  const year = project.projectDate ? project.projectDate.slice(0, 4) : '';
  const architects = (project.architects ?? [])
    .map((architect) => architect.name.trim())
    .filter(Boolean)
    .join(', ');

  return [formatLocation(project.location), year, architects]
    .filter(Boolean)
    .join(' · ');
}
