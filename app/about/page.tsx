import Link from 'next/link';

import { CtaBand } from '@/components/cta-band';
import { ImageSlot } from '@/components/image-slot';
import { revealDelay } from '@/lib/reveal';
import { Eyebrow } from '@/components/ui/eyebrow';
import { pageMetadata } from '@/lib/seo';
import { TEAM } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About Our Architectural Rep Firm',
  description:
    "A manufacturer's representative firm serving architects, contractors, and building owners across Kansas, Missouri, Iowa, and Nebraska, from specification through installation.",
  path: '/about',
});

// Unnumbered by design: the handoff replaced the 01/02/03 sequence here.
const VALUES = [
  {
    title: 'Established product lines',
    body: 'We represent manufacturers with a demonstrated record of quality and support, and we take on new lines selectively.',
  },
  {
    title: 'Consistent service',
    body: 'From initial samples through submittals, shop drawings, and close-out, the same team stays with the project.',
  },
  {
    title: 'Technical expertise',
    body: 'Attachment, movement, fire performance, acoustics, and budget are addressed early, so constraints are understood before they become RFIs.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 pb-14 md:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow className="mb-[22px]">About</Eyebrow>
            <h1 className="text-[clamp(44px,5.4vw,78px)] leading-[0.96] tracking-[-0.035em]">
              A representative firm
              <br />
              built on judgment,
              <br />
              <span className="text-ink-3">not catalogs.</span>
            </h1>
          </div>
          <p className="max-w-[44ch] text-[18px] leading-[1.55] text-ink-2">
            A manufacturer&apos;s representative firm serving architects,
            contractors, and building owners across Kansas, Missouri, Iowa, and
            Nebraska with established product lines and the technical support to
            specify them well.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="container-page">
        <div className="hairline-grid lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 bg-surface p-8 md:p-12">
            <Eyebrow>Our history</Eyebrow>
            <h2 className="max-w-[22ch] text-[clamp(26px,2.6vw,38px)] leading-[1.06] tracking-[-0.03em]">
              A long-held approach
            </h2>
            <p className="max-w-[48ch] text-[16px] leading-[1.6] text-ink-2">
              The firm was founded on a straightforward premise: design teams are
              better served by a representative who understands both the product
              and the assembly it lands in, and who can speak credibly to each.
            </p>
            <p className="max-w-[48ch] text-[16px] leading-[1.6] text-ink-2">
              Over the years we have built lasting relationships with respected
              manufacturers and become a trusted partner to design and
              construction teams throughout the region. Every project is handled
              directly by someone familiar with its details.
            </p>
          </div>
          {/* Deliberately a static asset rather than a Sanity project cover:
              the line in this building is one the firm no longer represents,
              so the photograph should carry no project or manufacturer
              attribution with it. */}
          <ImageSlot
            src="/images/about/midamerica-energy-training.jpg"
            alt="The MidAmerican Energy Company Training Center for Excellence in Des Moines, Iowa, its dark textured panel cladding wrapping a two-storey glazed corner"
            sizes="(max-width: 1024px) 100vw, 680px"
            large
            className="rv min-h-[280px] rounded-none lg:min-h-[440px]"
          />
        </div>
      </section>

      {/* Mission & values */}
      <section className="container-page pt-[88px]">
        <div className="mb-7">
          <Eyebrow className="mb-3.5">Mission &amp; values</Eyebrow>
          <h2 className="max-w-[26ch] text-[clamp(30px,3.4vw,48px)] leading-[1.02] tracking-[-0.032em]">
            How we work
          </h2>
        </div>
        <div className="hairline-grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          {VALUES.map((value, index) => (
            <div
              key={value.title}
              className="rv flex flex-col gap-3 bg-surface px-[30px] py-[34px]"
              style={revealDelay(index, 3)}
            >
              <h3 className="text-[21px] tracking-[-0.02em]">{value.title}</h3>
              <p className="text-[15px] leading-[1.55] text-ink-2">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container-page pt-[88px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow className="mb-3.5">Our team</Eyebrow>
            <h2 className="text-[clamp(30px,3.4vw,48px)] leading-[1.02] tracking-[-0.032em]">
              Our team
            </h2>
          </div>
          <Link href="/contact" className="link-more">
            Direct lines →
          </Link>
        </div>
        {/* Fixed three-up rather than auto-fit: with two people an
            auto-fit track stretches each portrait to half the page. */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, index) => (
            <div
              key={member.name}
              className="rv flex flex-col gap-3.5"
              style={revealDelay(index, 3)}
            >
              <ImageSlot
                src={member.photo}
                alt={member.name}
                aspect="4 / 5"
                caption={`portrait - ${member.name.split(' ')[0]}`}
                sizes="(max-width: 640px) 100vw, 400px"
                objectPosition="50% 15%"
              />
              <div>
                <div className="text-[19px] font-semibold tracking-[-0.015em]">
                  {member.name}
                </div>
                <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-brand">
                  {member.role}
                </div>
                {member.phone && member.email ? (
                  <div className="mt-2.5 flex flex-col gap-1 text-[14px] text-ink-2">
                    <a href={member.phoneHref} className="hover:text-brand">
                      {member.phone}
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-brand"
                    >
                      {member.email}
                    </a>
                  </div>
                ) : (
                  <p className="mt-2.5 text-[14px] text-ink-2">{member.blurb}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Get in touch"
        description="For questions about a product, an assembly, or a preliminary budget, our team is available directly."
        primary={{ href: '/contact', label: 'Contact us' }}
      />
    </>
  );
}
