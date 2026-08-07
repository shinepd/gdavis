'use client';

import { PortableText as PortableTextComponent } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { BlockContent, SanityImage } from '@/lib/sanity';

// Define the components for the PortableText
const components = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative my-8 w-full overflow-hidden rounded-sm">
          <figure>
            <Image
              src={urlFor(value).width(800).height(600).url()}
              alt={value.alt || 'Project image'}
              width={800}
              height={600}
              className="h-auto w-full rounded-sm object-cover"
            />
            {value.caption && (
              <figcaption className="mt-2 text-[13.5px] text-ink-3">
                {value.caption}
              </figcaption>
            )}
          </figure>
        </div>
      );
    },
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-brand hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="mt-10 mb-4 text-[30px] leading-[1.06] tracking-[-0.03em] text-ink">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 text-[26px] leading-[1.08] tracking-[-0.03em] text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-[21px] tracking-[-0.02em] text-ink">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-6 mb-2 text-[18px] tracking-[-0.02em] text-ink">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-[1.6]">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-2 border-brand pl-4 text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-[1.6]">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-[1.6]">{children}</li>
    ),
  },
};

interface PortableTextProps {
  value: BlockContent[];
}

export function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />;
}
