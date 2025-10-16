'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

export function HomeProducts() {
  const products = [
    {
      id: 'ceilings',
      title: 'Ceilings',
      description:
        'Comprehensive ceiling systems including acoustical, metal, and wood solutions for optimal sound control, durability, and aesthetic appeal.',
    },
    {
      id: 'architectural-glass',
      title: 'Architectural Glass',
      description:
        'Sleek, versatile glass systems for light, visibility, and dynamic space division with modern appeal.',
    },
    {
      id: 'rainscreens-and-cladding',
      title: 'Rainscreens & Cladding',
      description:
        'Complete facade solutions in metal, wood, terracotta, zinc, and concrete offering superior weather protection and stunning exteriors.',
    },
    {
      id: 'natural-materials',
      title: 'Natural Materials',
      description:
        'Sustainable systems featuring terracotta, wood panels, and composite stone for warm, biophilic design with lasting performance.',
    },
    {
      id: 'metal-systems',
      title: 'Metal Systems',
      description:
        'Modern metal solutions including cladding, rainscreens, and zinc facades for high-tech durability and distinctive architectural character.',
    },
    {
      id: 'specialty-materials',
      title: 'Specialty Materials',
      description:
        'Innovative products like concrete rainscreens and composite stone offering unique aesthetics with superior strength and low maintenance.',
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-secondary/10">
      <Container className="space-y-12">
        <SectionHeading
          title="Our Product Lines"
          description="We represent industry-leading manufacturers in various product categories."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-heading uppercase tracking-wide">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/products#${product.id}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
