import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CtaSection } from '@/components/sections/cta-section';
import {
  getProductCategoryBySlug,
  getAllProductCategories,
  urlFor,
} from '@/lib/sanity';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export async function generateStaticParams() {
  const categories = await getAllProductCategories();

  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getProductCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found | G. Davis & Associates',
      description: 'The requested product category could not be found.',
    };
  }

  return {
    title: `${category.title} | Products | G. Davis & Associates`,
    description:
      category.description ||
      `Explore our range of ${category.title} products from G. Davis & Associates.`,
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getProductCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-[800px]">
            <Link
              href="/products"
              className="text-primary hover:underline inline-flex items-center mb-4"
            >
              ← Back to All Products
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4">
              {category.title}
            </h1>
            {category.description && (
              <p className="text-xl text-muted-foreground max-w-[700px]">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.products.map((product) => (
              <Card key={product._id} className="h-full">
                <CardHeader>
                  {product.image ? (
                    <div className="h-48 relative rounded-md mb-4 overflow-hidden">
                      <Image
                        src={urlFor(product.image).width(400).height(300).url()}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-muted rounded-md flex items-center justify-center mb-4">
                      <span className="text-muted-foreground">
                        Product Image
                      </span>
                    </div>
                  )}
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  {product.manufacturer && (
                    <p className="text-xs text-muted-foreground mt-2">
                      By {product.manufacturer.name}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Request Info
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection
        title="Need Help Finding the Right Product?"
        description="Our team of experts is ready to assist you in selecting the perfect products for your project."
        secondaryButtonText="View Projects"
        secondaryButtonLink="/projects"
      />

      <Separator />
    </div>
  );
}
