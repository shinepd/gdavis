import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CtaSection } from '@/components/sections/cta-section';
import {
  getAllProductCategories,
  getAllManufacturers,
  urlFor,
} from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductsPage() {
  const categories = await getAllProductCategories();
  const manufacturers = await getAllManufacturers();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-[800px]">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Our Product Lines
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              G. Davis & Associates represents industry-leading manufacturers in
              various product categories.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
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
            {categories.map((category, categoryIndex) => (
              <div
                key={category._id}
                id={category.slug.current}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold group flex items-center">
                    <Link
                      href={`/products/${category.slug.current}`}
                      className="hover:text-primary transition-colors flex items-center"
                    >
                      {category.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <Card key={product._id} className="h-full">
                      <CardHeader>
                        {product.image ? (
                          <div className="h-48 relative rounded-md mb-4 overflow-hidden">
                            <Image
                              src={urlFor(product.image)
                                .width(400)
                                .height(300)
                                .url()}
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
                        <CardTitle className="text-lg">
                          {product.name}
                        </CardTitle>
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

                {categoryIndex < categories.length - 1 && (
                  <Separator className="my-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturers Section */}
      <section className="w-full py-12 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Our Manufacturers
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
              We represent the following industry-leading manufacturers, known
              for their quality and innovation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {manufacturers.map((manufacturer) => (
              <div
                key={manufacturer._id}
                className="flex flex-col items-center justify-center p-4 bg-background rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                {manufacturer.logo ? (
                  <div className="h-24 w-full relative mb-4">
                    <Image
                      src={urlFor(manufacturer.logo)
                        .width(200)
                        .height(100)
                        .url()}
                      alt={manufacturer.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-24 w-full flex items-center justify-center mb-4">
                    <span className="text-xl font-medium">
                      {manufacturer.name}
                    </span>
                  </div>
                )}
                {manufacturer.website && (
                  <Button variant="link" size="sm" asChild>
                    <a
                      href={manufacturer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
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
