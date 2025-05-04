'use client';

import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { MotionGroup, MotionItem } from '@/components/motion-wrapper';

export function AboutTestimonials() {
  const testimonials = [
    {
      quote:
        "G. Davis & Associates provided exceptional service and high-quality products for our project. Their team's expertise was invaluable throughout the process.",
      author: 'Jane Smith, Architect',
      company: 'Smith & Partners Architects',
    },
    {
      quote:
        'Working with G. Davis & Associates has been a pleasure. They consistently deliver on their promises and provide solutions that meet our design and performance requirements.',
      author: 'John Doe, Project Manager',
      company: 'ABC Construction',
    },
  ];

  return (
    <section className="w-full py-12 md:py-24">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          description="We take pride in our relationships with clients and the trust they place in us."
          centered
        />

        <MotionGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <MotionItem
              key={index}
              delay={index * 0.1}
              className="bg-secondary/20 p-6 rounded-lg relative"
            >
              <Quote className="h-8 w-8 text-primary/20 absolute -top-4 -left-4" />
              <p className="mb-4 italic font-sans text-lg">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionGroup>
      </Container>
    </section>
  );
}
