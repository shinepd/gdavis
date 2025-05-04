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
      title: 'Windows & Doors',
      description:
        'High-performance fenestration systems for residential and commercial projects.',
    },
    {
      title: 'Wall Systems',
      description:
        'Innovative wall systems that provide aesthetics, durability, and energy efficiency.',
    },
    {
      title: 'Interior Finishes',
      description:
        'Premium interior materials for walls, floors, and ceilings.',
    },
    {
      title: 'Exterior Cladding',
      description:
        'Durable and attractive exterior cladding solutions for any project.',
    },
    {
      title: 'Specialty Products',
      description:
        'Unique architectural products for special applications and design requirements.',
    },
    {
      title: 'Hardware & Accessories',
      description:
        'Quality hardware and accessories to complement architectural products.',
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
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/products">Learn More</Link>
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
