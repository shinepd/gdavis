'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Projects | G. Davis & Associates',
  description:
    'Explore our showcase of projects featuring high-quality architectural products from G. Davis & Associates.',
};

const projectData = [
  {
    title: 'Modern Office Building',
    location: 'Downtown Metropolitan Area',
    description:
      'A sleek office building featuring our high-performance curtain wall and window systems, providing energy efficiency and abundant natural light.',
    categories: ['Wall Systems', 'Windows & Doors'],
    year: '2023',
  },
  {
    title: 'Luxury Residential Complex',
    location: 'Waterfront District',
    description:
      'An upscale residential development showcasing our premium sliding door systems and interior finishes for elegant living spaces.',
    categories: ['Windows & Doors', 'Interior Finishes'],
    year: '2022',
  },
  {
    title: 'University Research Center',
    location: 'University Campus',
    description:
      'A state-of-the-art research facility utilizing our acoustic wall panels and specialized laboratory solutions for optimal functionality.',
    categories: ['Interior Finishes', 'Specialty Products'],
    year: '2022',
  },
  {
    title: 'Boutique Hotel Renovation',
    location: 'Historic District',
    description:
      "A careful renovation of a historic building featuring our custom hardware and door systems that complement the building's heritage.",
    categories: ['Hardware & Accessories', 'Windows & Doors'],
    year: '2021',
  },
  {
    title: 'Contemporary Art Museum',
    location: 'Cultural Center',
    description:
      'A dynamic museum space featuring our specialty glazing systems and innovative ceiling solutions to enhance the visitor experience.',
    categories: ['Wall Systems', 'Interior Finishes'],
    year: '2021',
  },
  {
    title: 'Mixed-Use Development',
    location: 'Urban Growth Area',
    description:
      'A comprehensive development with retail, office, and residential spaces, utilizing our exterior cladding systems and fenestration products.',
    categories: ['Exterior Cladding', 'Windows & Doors'],
    year: '2020',
  },
  {
    title: 'Corporate Headquarters',
    location: 'Business District',
    description:
      'A flagship corporate office featuring our premium glazing systems, operable partitions, and custom hardware solutions.',
    categories: ['Wall Systems', 'Hardware & Accessories'],
    year: '2020',
  },
  {
    title: 'Public Library Expansion',
    location: 'City Center',
    description:
      "An expansion to the city's main library, incorporating our acoustic solutions and specialized lighting control systems.",
    categories: ['Interior Finishes', 'Specialty Products'],
    year: '2019',
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
        <div className="container space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[800px]"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              Explore our showcase of projects featuring high-quality
              architectural products from G. Davis & Associates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="space-y-4 mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">
                  Featured Projects
                </h2>
                <p className="text-muted-foreground max-w-[700px]">
                  Browse our portfolio of projects where our products have been
                  utilized.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  All Projects
                </Button>
                {[
                  'Commercial',
                  'Residential',
                  'Institutional',
                  'Hospitality',
                ].map((category) => (
                  <Button key={category} variant="outline" size="sm">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <div className="aspect-[4/3] w-full bg-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-muted-foreground">Project Image</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {project.location}
                  </span>
                  <span className="text-sm font-medium">{project.year}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section className="w-full py-12 md:py-24 bg-secondary/10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tighter">
                Featured Case Study
              </h2>
              <h3 className="text-xl font-semibold">Modern Office Building</h3>
              <p className="text-muted-foreground">
                This flagship project demonstrates our ability to provide
                comprehensive architectural product solutions for commercial
                buildings.
              </p>
              <p className="text-muted-foreground">
                Working closely with the architects and contractors, we supplied
                high-performance curtain wall systems, energy-efficient windows,
                and custom interior solutions that met the client&apos;s
                aesthetic and functional requirements.
              </p>
              <div className="pt-4">
                <Button asChild>
                  <Link href="#">Read Full Case Study</Link>
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
                <span className="text-muted-foreground">
                  Featured Project Image
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="rounded-lg bg-primary p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  Start Your Next Project With Us
                </h2>
                <p className="text-primary-foreground/80">
                  Contact us today to discuss how G. Davis & Associates can
                  provide the perfect architectural products for your next
                  project.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />
    </div>
  );
}
