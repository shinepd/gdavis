import Link from 'next/link';

import { CtaBand } from '@/components/cta-band';
import { ImageSlot } from '@/components/image-slot';
import { revealDelay } from '@/lib/reveal';
import { Eyebrow } from '@/components/ui/eyebrow';
import { getProjectCards, imageUrl } from '@/lib/sanity';
import { TEAM } from '@/lib/site';

export const metadata = {
  title: 'About Us | G. Davis & Associates',
  description:
    "A manufacturer's representative firm bridging the gap between the people who make architectural products and the people who draw them into buildings.",
};

const VALUES = [
  {
    number: '01',
    title: 'Quality products',
    body: "We only take on lines we'd be comfortable specifying ourselves - manufacturers who care about the detail as much as the order.",
  },
  {
    number: '02',
    title: 'Exceptional service',
    body: 'From first sample through final punch list. The same person who brought the samples answers the shop drawing question.',
  },
  {
    number: '03',
    title: 'Technical expertise',
    body: 'Attachment, movement, fire, acoustics, and cost. We give you the real constraint before it becomes an RFI.',
  },
];

export default async function AboutPage() {
  const projects = await getProjectCards();
  const historyProject = projects.find((project) => project.coverImage);

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 pb-14 md:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow className="mb-[22px]">About</Eyebrow>
            <h1 className="text-[clamp(44px,5.4vw,78px)] leading-[0.96] tracking-[-0.035em]">
              We know these products
              <br />
              because we&apos;ve stood
              <br />
              <span className="text-ink-3">under them.</span>
            </h1>
          </div>
          <p className="max-w-[44ch] text-[18px] leading-[1.55] text-ink-2">
            A manufacturer&apos;s representative firm bridging the gap between the
            people who make architectural products and the people who draw them
            into buildings.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="container-page">
        <div className="hairline-grid lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 bg-surface p-8 md:p-12">
            <Eyebrow>Our history</Eyebrow>
            <h2 className="max-w-[22ch] text-[clamp(26px,2.6vw,38px)] leading-[1.06] tracking-[-0.03em]">
              Founded to close a gap
            </h2>
            <p className="max-w-[48ch] text-[16px] leading-[1.6] text-ink-2">
              Manufacturers had the products. Architects had the problems. What
              was missing was someone who understood both well enough to
              translate.
            </p>
            <p className="max-w-[48ch] text-[16px] leading-[1.6] text-ink-2">
              Over the years we&apos;ve built long relationships with leading
              lines and become a trusted partner to architects, contractors, and
              building owners across the region - while keeping the firm small
              enough that you always talk to someone who knows your job.
            </p>
          </div>
          <ImageSlot
            src={imageUrl(historyProject?.coverImage, 900, 900)}
            alt={historyProject ? historyProject.title.trim() : ''}
            caption="drop photo - office, job site, or archive image"
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
            Three things we refuse to be casual about
          </h2>
        </div>
        <div className="hairline-grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          {VALUES.map((value, index) => (
            <div
              key={value.number}
              className="rv flex flex-col gap-3 bg-surface px-[30px] py-[34px]"
              style={revealDelay(index, 3)}
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-brand">
                {value.number}
              </span>
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
              The people you&apos;ll actually work with
            </h2>
          </div>
          <Link href="/contact" className="link-more">
            Direct lines →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-5">
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
        description="Questions about a product, an assembly, or a budget number? Someone here has the answer."
        primary={{ href: '/contact', label: 'Contact us' }}
      />
    </>
  );
}
