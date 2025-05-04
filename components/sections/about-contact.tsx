'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MotionFade } from '@/components/motion-wrapper';
import Link from 'next/link';

export function AboutContact() {
  return (
    <section className="w-full py-12 md:py-24">
      <Container>
        <MotionFade className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground md:text-lg mb-8">
            Interested in our products or services? Have questions about how we
            can help your business? Our team is ready to assist you with any
            inquiries.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </MotionFade>
      </Container>
    </section>
  );
}
