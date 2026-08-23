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
    'Architectural product representation for design and construction teams across the central states.',
  address: {
    street: '12004 Pawnee Lane',
    city: 'Leawood',
    state: 'KS',
    stateName: 'Kansas',
    zip: '66209',
  },
  hours: 'Mon–Fri, 8:00–5:00 CT',
} as const;

/**
 * The four-up strip on the home page. Per the handoff's voice notes, this
 * describes capability rather than counting categories, manufacturers, or
 * lines: numeric claims were removed on purpose during client review and
 * should not be reintroduced, including via CMS-driven counts.
 */
export const CAPABILITIES = [
  { label: 'Territory', lines: ['Kansas · Missouri', 'Iowa · Nebraska'] },
  { label: 'Scope', lines: ['Interior and exterior', 'architectural systems'] },
  { label: 'Support', lines: ['Specification through', 'installation'] },
  { label: 'Sectors', lines: ['Sports · Aviation', 'Education · Civic'] },
] as const;

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
    discipline: 'Rainscreens, cladding, terracotta, and metal systems',
    phone: '(913) 231-8071',
    phoneHref: 'tel:9132318071',
    email: 'george@gdavisassociates.com',
    photo: '/images/team/george.png',
  },
  {
    name: 'Maddie Shine',
    role: 'Sales · Interiors',
    discipline: 'Ceilings, acoustics, wood, and glass systems',
    phone: '(913) 744-0191',
    phoneHref: 'tel:9137440191',
    email: 'maddie@gdavisassociates.com',
    photo: '/images/team/maddie.png',
  },
  {
    name: 'Makensi McDonald',
    role: 'Marketing',
    blurb: 'Continuing education, presentations, and sample coordination.',
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
  /** Two-line description shown on the product card. */
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
      'PET felt and acoustic systems that meet specified NRC targets while offering a broad range of finishes and formats.',
    tags: ['Interior', 'Ceiling', 'Wall'],
    groups: ['ceilings'],
  },
  'aluminum-cladding-and-shading': {
    title: 'Aluminum Cladding & Shading',
    blurb:
      'Extruded aluminum battens and panels for cladding, soffits, and solar shading, finished in realistic woodgrain or RAL color.',
    tags: ['Exterior', 'Wall', 'Soffit'],
    groups: ['facades'],
  },
  'architectural-glass': {
    title: 'Architectural Glass',
    blurb:
      'Channel and cast glass that admits daylight while managing privacy, reading as a continuous translucent plane.',
    tags: ['Interior', 'Exterior', 'Wall'],
    groups: ['glass', 'facades'],
  },
  'architectural-wire-mesh': {
    title: 'Architectural Wire Mesh',
    blurb:
      'Woven stainless steel mesh carried on tensioned attachment hardware, used for facades, solar screening, and interior partitions.',
    tags: ['Interior', 'Exterior', 'Wall'],
    groups: ['facades', 'interiors'],
  },
  'composite-stone': {
    title: 'Composite Stone',
    blurb:
      'The appearance of quarried stone at substantially reduced weight, with thin panels that ease structural and attachment requirements.',
    tags: ['Interior', 'Exterior', 'Wall'],
    groups: ['facades', 'interiors'],
  },
  'metal-ceilings': {
    title: 'Metal Ceilings',
    blurb:
      'Durable panel and access systems specified for aviation, laboratory, and healthcare environments where cleanability and access matter.',
    tags: ['Interior', 'Exterior soffit', 'Ceiling'],
    groups: ['ceilings'],
  },
  'metal-rainscreens-and-cladding': {
    title: 'Metal Rainscreens & Cladding',
    blurb:
      'Formed metal panels with precise reveals and shadow lines, engineered around a drained and ventilated cavity.',
    tags: ['Exterior', 'Wall'],
    groups: ['facades'],
  },
  'polycarbonate-daylighting': {
    title: 'Polycarbonate Daylighting',
    blurb:
      'Translucent polycarbonate glazing that carries daylight across long spans, insulating better than glass at a fraction of the weight.',
    tags: ['Interior', 'Exterior', 'Wall', 'Roof'],
    groups: ['glass', 'facades'],
  },
  'terracotta-rainscreens-and-cladding': {
    title: 'Terracotta Rainscreens & Cladding',
    blurb:
      'Fired clay facade systems offering durable color, natural texture, and a long documented service life.',
    tags: ['Exterior', 'Wall', 'Roof'],
    groups: ['facades'],
  },
  'wood-ceilings-and-wall-panels': {
    title: 'Wood Ceilings & Wall Panels',
    blurb:
      'Real veneer slat and linear systems available with acoustic backing and Class A fire ratings.',
    tags: ['Interior', 'Ceiling', 'Wall'],
    groups: ['ceilings', 'interiors'],
  },
  'wood-rainscreens': {
    title: 'Wood Rainscreens',
    blurb:
      'Ventilated wood facade panels engineered for finish stability and reduced long-term maintenance.',
    tags: ['Exterior', 'Wall', 'Soffit'],
    groups: ['facades'],
  },
  'concrete-rainscreens': {
    title: 'Concrete Rainscreens',
    blurb:
      'Non-combustible facade panels offering a durable, low-maintenance surface and strong weather performance.',
    tags: ['Exterior', 'Wall'],
    groups: ['facades'],
  },
  'zinc-rainscreens-and-cladding': {
    title: 'Zinc Rainscreens & Cladding',
    blurb:
      'Zinc facade systems with self-healing properties and a patina that develops predictably over the service life.',
    tags: ['Exterior', 'Wall', 'Roof'],
    groups: ['facades'],
  },
};

/**
 * One-line descriptor under each manufacturer in the "Represented lines"
 * directory, keyed by Sanity slug. Anything absent falls back to its category
 * title, so a newly added manufacturer still reads sensibly.
 */
export const MANUFACTURER_SUBLINES: Record<string, string> = {
  'sky-acoustics': 'Acoustic ceilings & walls',
  autex: 'Acoustic ceilings & walls',
  bendheim: 'Architectural glass',
  gammastone: 'Composite stone panels',
  petrarch: 'Composite stone rainscreens',
  steni: 'Stone composite facade panels',
  nordic: 'GFRC panels',
  ulma: 'Precast concrete rainscreen',
  danpal: 'Polycarbonate daylighting',
  forme: 'Extruded aluminum cladding & shading',
  'ws-tyler': 'Stainless steel wire mesh',
  gordon: 'Metal ceilings & soffits',
  lindner: 'Metal ceiling systems',
  'millennium-forms': 'Formed metal panels',
  'tekko-metals': 'Metal rainscreens',
  argeton: 'Terracotta facades',
  ludowici: 'Terracotta roof & wall',
  linea: 'Wood ceilings & wall panels',
  'parklex-prodema': 'Wood rainscreens',
};

/**
 * Local logo files that override what Sanity holds, keyed by manufacturer slug.
 *
 * These three were supplied to Sanity as opaque JPEGs or a flat PNG, so they
 * rendered as a visible box inside the logo plate. The replacements are the
 * manufacturers' own marks with real transparency, taken from their sites.
 * Lindner only publishes a white monochrome SVG, so it is recoloured to dark
 * ink for the light plate - solid-colour reproduction their brand permits.
 *
 * This map should shrink to nothing: upload the better files to Sanity and
 * delete the entry. Anything not listed here uses the Sanity asset.
 */
export const LOGO_OVERRIDES: Record<string, string> = {
  'millennium-forms': '/images/logos/millennium-forms.png',
  'tekko-metals': '/images/logos/tekko-metals.png',
  lindner: '/images/logos/lindner.svg',
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
      'Acoustical, metal, and wood systems that address sound performance and finish in a single assembly.',
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
      'Channel and cast glass systems for daylighting, privacy, and translucent partitions.',
    categorySlugs: ['architectural-glass'],
    href: '/products?filter=glass',
  },
  {
    title: 'Rainscreens & Cladding',
    blurb:
      'Metal, wood, terracotta, and stone facade systems built on drained and ventilated cavity design.',
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
      'Real wood, fired clay, and composite stone for projects where natural materials must also meet code.',
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
      'Formed panels, soffits, and ceilings engineered to hold the reveals and tolerances shown on your elevations.',
    categorySlugs: ['metal-rainscreens-and-cladding', 'metal-ceilings'],
    href: '/products',
  },
  {
    title: 'Specialty Materials',
    blurb:
      'Composite stone and engineered panels that deliver distinctive finishes with predictable maintenance.',
    categorySlugs: ['composite-stone'],
    href: '/products?filter=interiors',
  },
];

/** Named contact paths, used on the Products page and the header CTA. */
export const CONTACT_PATHS = [
  {
    title: 'Request samples',
    detail: 'Material chips and finish boards sent to your office',
    subject: 'Sample request',
  },
  {
    title: 'Get spec & detail support',
    detail: 'Sections, attachment details, and preliminary budgets',
    subject: 'Spec support',
  },
  {
    title: 'Schedule a presentation',
    detail: 'Continuing education credit, presented at your office',
    subject: 'Continuing education presentation',
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
