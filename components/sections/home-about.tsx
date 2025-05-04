'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function HomeAbout() {
  const benefits = [
    'Experienced team',
    'Quality products',
    'Exceptional service',
    'Technical support',
  ];

  return (
    <section className="w-full py-12 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-heading uppercase tracking-wide text-3xl sm:text-4xl">
              About G. Davis & Associates
            </h2>
            <p className="text-muted-foreground">
              Since our founding, G. Davis & Associates has been committed to
              providing architects, contractors, and building owners with
              high-quality architectural products and exceptional service.
            </p>
            <p className="text-muted-foreground">
              Our experienced team works closely with clients to understand
              their needs and provide customized solutions for their projects.
            </p>
            <div className="space-y-2">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-video overflow-hidden rounded-lg"
          >
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Company Image</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
