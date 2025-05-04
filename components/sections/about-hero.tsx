'use client';

import { MotionFade } from '@/components/motion-wrapper';
import { Container } from '@/components/ui/container';

export function AboutHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
      <Container className="space-y-8">
        <MotionFade className="max-w-[800px]">
          <h1 className="font-serif font-medium tracking-tight mb-6">
            About G. Davis & Associates
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] leading-relaxed">
            A manufacturer&apos;s representative firm dedicated to providing
            high-quality architectural products and exceptional service since
            our founding.
          </p>
        </MotionFade>
      </Container>
    </section>
  );
}
