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
        <div className="relative w-full my-6 rounded-lg overflow-hidden">
          <figure>
            <Image
              src={urlFor(value).width(800).height(600).url()}
              alt={value.alt || 'Project image'}
              width={800}
              height={600}
              className="object-cover rounded-lg"
            />
            {value.caption && (
              <figcaption className="mt-2 text-sm text-muted-foreground italic">
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
          className="text-primary hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl md:text-4xl font-heading uppercase tracking-wide mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl md:text-3xl font-heading uppercase tracking-wide mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl md:text-2xl font-heading uppercase tracking-wide mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg md:text-xl font-heading uppercase tracking-wide mt-4 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
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
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

interface PortableTextProps {
  value: BlockContent[];
}

export function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />;
}
