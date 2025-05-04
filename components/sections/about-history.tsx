'use client';

import { MotionSlideLeft, MotionSlideRight } from '@/components/motion-wrapper';
import { Container } from '@/components/ui/container';

export function AboutHistory() {
  return (
    <section className="w-full py-12 md:py-24 bg-secondary/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MotionSlideLeft className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Our History</h2>
            <p className="text-muted-foreground">
              G. Davis & Associates was founded with a vision to bridge the gap
              between architectural product manufacturers and the design
              community.
            </p>
            <p className="text-muted-foreground">
              Over the years, we have built strong relationships with leading
              manufacturers and have become a trusted partner for architects,
              contractors, and building owners across the region.
            </p>
            <p className="text-muted-foreground">
              Our commitment to quality, service, and technical expertise has
              allowed us to grow and expand our product offerings while
              maintaining our core values.
            </p>
          </MotionSlideLeft>

          <MotionSlideRight className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">
                Company History Image
              </span>
            </div>
          </MotionSlideRight>
        </div>
      </Container>
    </section>
  );
}
