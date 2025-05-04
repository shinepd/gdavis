'use client';

import { Building, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { MotionGroup, MotionItem } from '@/components/motion-wrapper';

export function AboutValues() {
  const values = [
    {
      title: 'Quality Products',
      description:
        'We partner with manufacturers who share our commitment to quality and innovation.',
      icon: <Building className="h-6 w-6" />,
    },
    {
      title: 'Exceptional Service',
      description:
        'We provide personalized service and support throughout the entire project lifecycle.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Technical Expertise',
      description:
        'Our team has extensive knowledge of architectural products and applications.',
      icon: <Award className="h-6 w-6" />,
    },
  ];

  return (
    <section className="w-full py-12 md:py-24">
      <Container>
        <SectionHeading
          title="Our Mission & Values"
          description="Our mission is to provide architects, contractors, and building owners with high-quality architectural products and exceptional service."
          centered
        />

        <MotionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <MotionItem key={index} delay={index * 0.1}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2 text-primary">
                    {value.icon}
                  </div>
                  <CardTitle className="font-serif">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </MotionItem>
          ))}
        </MotionGroup>
      </Container>
    </section>
  );
}
