'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { HeroSlideshow } from '@/components/hero-slideshow';

export function HomeHero() {
  return (
    <section className="w-full h-[80vh] min-h-[600px] relative overflow-hidden">
      <HeroSlideshow>
        <Container className="flex h-full flex-col items-center justify-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-[800px]"
          >
            <h1 className="font-heading text-white uppercase tracking-wide drop-shadow-md">
              Architectural Products for Modern Design
            </h1>
            <p className="text-xl text-white/90 max-w-[700px] mx-auto">
              G. Davis & Associates provides high-quality architectural products
              for your design needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" variant="white" asChild>
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="whiteOutline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </Container>
      </HeroSlideshow>
    </section>
  );
}
