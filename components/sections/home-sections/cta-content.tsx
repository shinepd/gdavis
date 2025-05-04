'use client';

import { motion } from 'framer-motion';
import { CtaSection } from '@/components/sections/cta-section';

export function CtaContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <CtaSection
        title="Ready to start your project?"
        description="Contact us today to discuss how G. Davis & Associates can provide the perfect architectural products for your next project."
      />
    </motion.div>
  );
}
