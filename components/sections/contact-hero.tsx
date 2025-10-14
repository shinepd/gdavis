'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';

export function ContactHero() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden bg-secondary/30">
      <Container className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[800px]"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px]">
            We&apos;d love to hear from you. Reach out to our team with any
            questions about our products or services.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
