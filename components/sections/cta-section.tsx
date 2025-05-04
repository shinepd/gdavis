'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function CtaSection({
  title = 'Start Your Next Project With Us',
  description = 'Contact us today to discuss how G. Davis & Associates can provide the perfect architectural products for your next project.',
  primaryButtonText = 'Contact Us',
  primaryButtonLink = '/contact',
  secondaryButtonText = 'Browse Products',
  secondaryButtonLink = '/products',
}: CtaSectionProps) {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="rounded-lg bg-primary p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading uppercase tracking-wide text-primary-foreground">
                {title}
              </h2>
              <p className="text-primary-foreground/80">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Button size="lg" variant="white" asChild>
                <Link href={primaryButtonLink}>{primaryButtonText}</Link>
              </Button>
              <Button size="lg" variant="whiteOutline" asChild>
                <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
