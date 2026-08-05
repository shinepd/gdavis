import { ContactForm } from '@/components/contact-form';
import { Eyebrow } from '@/components/ui/eyebrow';
import { GEORGE, MADDIE, SITE } from '@/lib/site';

const STEPS = [
  'You send the problem',
  'We come back with two or three options',
  'Samples and details follow within the week',
];

// OpenStreetMap embed, keyed to the Leawood office. No API key, no tracking.
const MAP_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-94.6595%2C38.8935%2C-94.6295%2C38.9105&layer=mapnik&marker=38.9020%2C-94.6445';

export default function ContactPage() {
  const people = [
    { eyebrow: 'Exteriors', person: GEORGE },
    { eyebrow: 'Interiors', person: MADDIE },
  ];

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 pb-12 md:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow className="mb-[22px]">Contact</Eyebrow>
            <h1 className="text-[clamp(44px,5.4vw,78px)] leading-[0.96] tracking-[-0.035em]">
              Call the person
              <br />
              who knows
              <br />
              <span className="text-ink-3">the answer.</span>
            </h1>
          </div>
          <p className="max-w-[44ch] text-[18px] leading-[1.55] text-ink-2">
            Exteriors and interiors are split between two reps, so you skip the
            switchboard. Samples, specs, budget numbers, or a lunch-and-learn -
            start here.
          </p>
        </div>
      </section>

      {/* Direct lines */}
      <section className="container-page">
        <div className="hairline-grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          {people.map(({ eyebrow, person }) => (
            <div
              key={person.name}
              className="rv flex flex-col gap-3.5 bg-surface px-[30px] py-[34px]"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-brand">
                {eyebrow}
              </span>
              <div>
                <div className="text-[21px] font-semibold tracking-[-0.02em]">
                  {person.name}
                </div>
                <div className="mt-1 text-[14px] text-ink-3">
                  {person.discipline}
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-1 pt-2 text-[15px]">
                <a href={person.phoneHref} className="font-medium hover:text-brand">
                  {person.phone}
                </a>
                <a
                  href={`mailto:${person.email}`}
                  className="text-ink-2 hover:text-brand"
                >
                  {person.email}
                </a>
              </div>
            </div>
          ))}

          <div className="rv flex flex-col gap-3.5 bg-surface px-[30px] py-[34px]">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-brand">
              Office
            </span>
            <div>
              <div className="text-[21px] font-semibold leading-[1.2] tracking-[-0.02em]">
                {SITE.address.street}
              </div>
              <div className="mt-1 text-[15px] text-ink-2">
                {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </div>
            </div>
            <div className="mt-auto pt-2 text-[14px] text-ink-3">{SITE.hours}</div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container-page pt-14">
        <div className="hairline-grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col justify-center gap-5 bg-surface p-8 md:p-11">
            <h2 className="max-w-[20ch] text-[clamp(26px,2.6vw,38px)] leading-[1.06] tracking-[-0.03em]">
              Tell us what you&apos;re drawing
            </h2>
            <p className="max-w-[42ch] text-[16px] leading-[1.55] text-ink-2">
              Attach nothing, or attach everything. An elevation, a spec section,
              or one sentence about the look you&apos;re after is enough to get
              started.
            </p>
            <div className="mt-2 flex flex-col gap-3">
              {STEPS.map((step, index) => (
                <div
                  key={step}
                  className="flex items-baseline gap-2.5 text-[15px]"
                >
                  <span className="font-mono text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section className="container-page pt-14 pb-24">
        <div className="rv overflow-hidden rounded-md border border-line">
          <iframe
            title={`Map of the ${SITE.address.city}, ${SITE.address.state} office`}
            src={MAP_SRC}
            loading="lazy"
            className="block aspect-[21/9] w-full border-0 md:aspect-[21/7]"
          />
        </div>
      </section>
    </>
  );
}
