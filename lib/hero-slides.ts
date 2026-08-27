/**
 * Photography for the home page hero carousel.
 *
 * The files are static rather than Sanity assets on purpose: the hero is the
 * one slot on the site whose crop, order, and pacing are art-directed, so each
 * frame carries its own `objectPosition` tuned for the wide hero window. Swap
 * a photo by dropping a 2400px sRGB JPEG into `public/images/hero` and editing
 * the entry below; `blurDataURL` is a 16px inline preview so a slide never
 * flashes empty before it decodes.
 *
 * `href` links the caption to the matching Sanity project page where one
 * exists. Leave it off rather than guessing - an unlinked caption is fine.
 */
export interface HeroSlide {
  src: string;
  alt: string;
  /** Building or project name, shown as the caption's first line. */
  title: string;
  /** Material or system, shown under the title. */
  detail: string;
  /** Project page the caption links to, when the project is in Sanity. */
  href?: string;
  /** Per-photo crop anchor for the wide hero window. */
  objectPosition: string;
  /** Inline 16px JPEG shown while the full frame decodes. */
  blurDataURL: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/images/hero/kci-parking-channel-glass-facade.jpg',
    alt: 'Kansas City International Airport at dusk, the parking structure clad in a backlit translucent glass rainscreen beside the terminal canopy',
    title: 'Kansas City International Airport',
    detail: 'Backlit glass rainscreen · Kansas City, MO',
    href: '/projects/kansas-city-international-airport',
    objectPosition: 'center 45%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAAJABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAQIE/8QAIBAAAgEDBAMAAAAAAAAAAAAAAQIAAwQSISIxcTIz0f/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGREBAAIDAAAAAAAAAAAAAAAAAQAREiFB/9oADAMBAAIRAxEAPwApVFDbtV6kXGByIqso5ChR8mZvFO43vrWVcnVwlHJ//9k=',
  },
  {
    src: '/images/hero/wichita-state-barton-school-facade.jpg',
    alt: 'The Barton School of Business at Wichita State University lit at dusk, with terracotta panels wrapping a glazed curtain wall',
    title: 'Wichita State University',
    detail: 'Terracotta and curtain wall · Wichita, KS',
    href: '/projects/wsu',
    objectPosition: 'center 60%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAAJABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAEC/8QAIBAAAgIBAwUAAAAAAAAAAAAAAQIABBEDEkEhMTJxkf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAECA0H/2gAMAwEAAhEDEQA/AC1ag1VyuABye0zq1whYvsK9QMMPstnxgG59Re1slRK4f//Z',
  },
  {
    src: '/images/hero/iowa-state-club-perforated-ceiling.jpg',
    alt: 'Club lounge at the Iowa State football facility, with a curved perforated metal ceiling washed in red light',
    title: 'ISU Football Facility',
    detail: 'Perforated metal ceiling · Ames, IA',
    href: '/projects/isu-football-facility',
    objectPosition: 'center 50%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAALABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBf/EAB8QAAICAQUBAQAAAAAAAAAAAAECAxEABBMikdEFIf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGBEBAAMBAAAAAAAAAAAAAAAAEQASIQH/2gAMAwEAAhEDEQA/AMjVwOsrJLAUItjdj88xdNA7SBI4S5NNQs2PMl9J3h2yjtzXlZu+8Ggkkl3C7sSigLRqusMxlV+2DZ//2Q==',
  },
  {
    src: '/images/hero/msu-welcome-center-perforated-screen.jpg',
    alt: 'The Missouri State University Welcome Center at dusk, a long perforated screen wall cantilevered over a glazed entry',
    title: 'MSU Welcome Center',
    detail: 'Perforated screen wall · Springfield, MO',
    href: '/projects/msu-welcome-center',
    objectPosition: 'center 55%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAIF/8QAIBAAAgIBBAMBAAAAAAAAAAAAAQIDBBEAEjFBBUJxgf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQADEv/aAAwDAQACEQMRAD8ANWrUr6YjkEcgHr2fnf5o01CWFjw6jtdaM1GrF5BxHAibVTG0YxkHV2wEQhAF3c4HOqNkY5G//9k=',
  },
  {
    src: '/images/hero/bendheim-backlit-glass-wall.jpg',
    alt: 'A backlit decorative glass wall glowing blue inside a lobby, seen at night through the building curtain wall',
    title: 'NextGen Precision Health',
    detail: 'Backlit decorative glass · Columbia, MO',
    href: '/projects/nextgen-precision-health-university-of-missouri',
    objectPosition: 'center 55%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAALABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgMEBf/EACMQAAEDAgYDAQAAAAAAAAAAAAECAwQAIQUREhMiUTFBUtH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABcRAAMBAAAAAAAAAAAAAAAAAAACEQH/2gAMAwEAAhEDEQA/AFR8MBUrTKeR4+fypMRihhxALziwQeRSMxas5Et8ZHcvf0OqMzJBCV7nJJsdI6ozXISqTbT/2Q==',
  },
  {
    src: '/images/hero/scc-rieder-concrete-skin-facade.jpg',
    alt: 'Southeast Community College at sunset, an exposed steel frame carrying red concrete skin panels above a lawn',
    title: 'Southeast Community College',
    detail: 'Glassfibre reinforced concrete panels · Beatrice, NE',
    href: '/projects/scc',
    objectPosition: 'center 70%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAAKABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgMEBf/EACAQAAIBBAEFAAAAAAAAAAAAAAECAwAEESFRBRIxgZH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABgRAQADAQAAAAAAAAAAAAAAAAEAETET/9oADAMBAAIRAxEAPwB72tuhMcoJxs61UM/SrC4mws7Rs2xkALgDnisMSyYx3t9oXZj5Yn3TouyUGT//2Q==',
  },
  {
    src: '/images/hero/kci-elevator-core-metal-panel.jpg',
    alt: 'An elevator core at Kansas City International Airport faced in bronze metal wall panel beneath a linear wood ceiling',
    title: 'Kansas City International Airport',
    detail: 'Metal wall panel and linear wood ceiling · Kansas City, MO',
    href: '/projects/kansas-city-international-airport',
    objectPosition: 'center 50%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAAMABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAEEBf/EACEQAAIBAwMFAAAAAAAAAAAAAAECAAMEERITURQhcZHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABcRAAMBAAAAAAAAAAAAAAAAAAASIRH/2gAMAwEAAhEDEQA/AIUdnXUagGQQfPMZYquoVASAAPs3lsrZVwKK4xxDpLc9tlPUJaK0w//Z',
  },
  {
    src: '/images/hero/concourse-metal-ceiling-glass-wall.jpg',
    alt: 'A concourse with a textured metal ceiling sweeping over a full-height cable-supported glass wall',
    title: 'Concourse ceiling and glass wall',
    detail: 'Textured metal ceiling · Cable-supported glazing',
    objectPosition: 'center 48%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAAMABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABAX/xAAfEAACAgEEAwAAAAAAAAAAAAABAgMEABESIVEFMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwAluJrcgmA1SNQGHR+jENXYV3KRk7V15yHXtzLVkAcjaytwfZPeUK3k7LIjMwJLaHCV/9k=',
  },
  {
    src: '/images/hero/hillside-pavilion-panel-cedar.jpg',
    alt: 'A low pavilion set into a grass berm, combining white panel cladding, cedar siding, and a dark shingled roof',
    title: 'Hillside pavilion',
    detail: 'Fiber cement panel and cedar cladding',
    objectPosition: 'center 66%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABUOEBIQDRUSERIYFhUZHzQiHx0dH0AuMCY0TENQT0tDSUhUXnlmVFlyWkhJaY9qcnyAh4iHUWWUn5ODnXmEh4L/2wBDARYYGB8cHz4iIj6CVklWgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoL/wAARCAAMABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBf/EAB8QAAICAgEFAAAAAAAAAAAAAAECAxEABBMhQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECERMUIf/aAAwDAQACEQMRAD8ADa8MAHIwBYWB3I85aPUjkW0IOZYkeupv7jNszBCgkYL6NYdx31EsUT//2Q==',
  },
];
