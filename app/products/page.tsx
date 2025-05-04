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
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Products | G. Davis & Associates',
  description:
    'Explore our extensive range of high-quality architectural products for your design and construction needs.',
};

const productCategories = [
  {
    id: 'windows-doors',
    title: 'Windows & Doors',
    description:
      'High-performance fenestration systems designed for residential and commercial applications.',
    products: [
      {
        name: 'Aluminum Windows',
        description:
          'Energy-efficient aluminum windows for commercial projects.',
      },
      {
        name: 'Sliding Door Systems',
        description:
          'Elegant sliding door solutions for indoor and outdoor transitions.',
      },
      {
        name: 'Entry Door Systems',
        description: 'Secure and stylish entry door options for any project.',
      },
      {
        name: 'Window Wall Systems',
        description: 'Expansive window wall systems for dramatic views.',
      },
    ],
  },
  {
    id: 'wall-systems',
    title: 'Wall Systems',
    description:
      'Innovative wall systems providing aesthetics, durability, and energy efficiency.',
    products: [
      {
        name: 'Curtain Wall Systems',
        description:
          'Sleek curtain wall systems for modern commercial facades.',
      },
      {
        name: 'Glass Wall Systems',
        description: 'Transparent glass wall solutions for interior spaces.',
      },
      {
        name: 'Operable Wall Systems',
        description: 'Flexible operable walls for adaptable spaces.',
      },
      {
        name: 'Partition Systems',
        description:
          'Stylish partition systems for office and commercial spaces.',
      },
    ],
  },
  {
    id: 'interior-finishes',
    title: 'Interior Finishes',
    description: 'Premium interior materials for walls, floors, and ceilings.',
    products: [
      {
        name: 'Acoustic Panels',
        description: 'Sound-absorbing panels for improved acoustics.',
      },
      {
        name: 'Wall Coverings',
        description: 'Decorative wall covering options for any interior.',
      },
      {
        name: 'Ceiling Systems',
        description: 'Innovative ceiling solutions for commercial spaces.',
      },
      {
        name: 'Flooring Solutions',
        description: 'Durable and attractive flooring options.',
      },
    ],
  },
  {
    id: 'exterior-cladding',
    title: 'Exterior Cladding',
    description:
      'Durable and attractive exterior cladding solutions for any project.',
    products: [
      {
        name: 'Metal Panel Systems',
        description: 'Lightweight and durable metal panel systems.',
      },
      {
        name: 'Composite Cladding',
        description:
          'Long-lasting composite materials for exterior applications.',
      },
      {
        name: 'Stone Veneer',
        description: 'Natural and manufactured stone veneer products.',
      },
      {
        name: 'Rainscreen Systems',
        description:
          'High-performance rainscreen systems for moisture management.',
      },
    ],
  },
  {
    id: 'specialty-products',
    title: 'Specialty Products',
    description:
      'Unique architectural products for special applications and design requirements.',
    products: [
      {
        name: 'Skylights',
        description:
          'Energy-efficient skylight solutions for natural daylighting.',
      },
      {
        name: 'Sunshades',
        description: 'Exterior sunshades for solar control and aesthetics.',
      },
      {
        name: 'Architectural Louvers',
        description: 'Functional and decorative louver systems.',
      },
      {
        name: 'Fire-Rated Solutions',
        description: 'Code-compliant fire-rated glazing and door systems.',
      },
    ],
  },
  {
    id: 'hardware-accessories',
    title: 'Hardware & Accessories',
    description:
      'Quality hardware and accessories to complement architectural products.',
    products: [
      {
        name: 'Door Hardware',
        description: 'Premium door hardware for commercial applications.',
      },
      {
        name: 'Window Hardware',
        description: 'Functional and attractive window hardware options.',
      },
      {
        name: 'Bathroom Accessories',
        description: 'Commercial bathroom fixtures and accessories.',
      },
      {
        name: 'Custom Hardware',
        description: 'Custom hardware solutions for unique applications.',
      },
    ],
  },
];

export default function ProductsPage() {
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
              Our Product Lines
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              G. Davis & Associates represents industry-leading manufacturers in
              various product categories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">
              Product Categories
            </h2>
            <p className="text-muted-foreground max-w-[700px]">
              Explore our extensive range of high-quality architectural products
              for your design and construction needs.
            </p>
          </div>

          <div className="space-y-20">
            {productCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                id={category.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, productIndex) => (
                    <motion.div
                      key={`${category.id}-${productIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: productIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <div className="h-32 bg-muted rounded-md flex items-center justify-center mb-4">
                            <span className="text-muted-foreground">
                              Product Image
                            </span>
                          </div>
                          <CardTitle className="text-lg">
                            {product.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Request Info
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {categoryIndex < productCategories.length - 1 && (
                  <Separator className="my-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturers Section */}
      <section className="w-full py-12 md:py-24 bg-secondary/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Our Manufacturers
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
              We represent the following industry-leading manufacturers, known
              for their quality and innovation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center h-24 bg-muted rounded-md"
              >
                <span className="text-muted-foreground">Logo {index + 1}</span>
              </motion.div>
            ))}
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
                  Need Help Finding the Right Product?
                </h2>
                <p className="text-primary-foreground/80">
                  Our team of experts is ready to assist you in selecting the
                  perfect products for your project.
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
                  <Link href="/projects">View Projects</Link>
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
