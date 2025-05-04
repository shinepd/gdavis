'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

export function HomeProjects() {
  return (
    <section className="w-full py-12 md:py-24 bg-secondary/10">
      <Container className="space-y-12">
        <SectionHeading
          title="Featured Projects"
          description="Our products have been used in various prestigious projects across the region."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg"
            >
              <Link href="/projects" className="group relative block">
                <div className="aspect-[4/3] w-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">
                    Project {item} Image
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-medium">View Project</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
