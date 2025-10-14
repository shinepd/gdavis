'use client';

import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { MotionGroup, MotionItem } from '@/components/motion-wrapper';

export function AboutTeam() {
  const teamMembers = [
    { name: 'George Davis', title: 'Founder' },
    { name: 'Maddie Shine', title: 'Sales' },
    { name: 'Makensi McDonald', title: 'Marketing' },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-secondary/10">
      <Container>
        <SectionHeading
          title="Our Team"
          description="Meet our experienced team of professionals dedicated to providing exceptional service and support."
          centered
        />

        <MotionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <MotionItem
              key={index}
              delay={index * 0.1}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-muted mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Photo</span>
              </div>
              <h3 className="font-serif font-medium text-lg mb-1">
                {member.name}
              </h3>
              <p className="text-muted-foreground">{member.title}</p>
            </MotionItem>
          ))}
        </MotionGroup>
      </Container>
    </section>
  );
}
