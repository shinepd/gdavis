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
import { getManufacturersByCategory, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductsPage() {
  const categoriesWithManufacturers = await getManufacturersByCategory();

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
            {categoriesWithManufacturers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No product categories found. Please add manufacturers with
                  categories in Sanity Studio.
                </p>
              </div>
            ) : (
              categoriesWithManufacturers.map((category, categoryIndex) => (
                <div key={category.id} id={category.id} className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    {category.description && (
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {category.manufacturers.map((manufacturer) => (
                      <Card
                        key={manufacturer._id}
                        className="h-full flex flex-col"
                      >
                        <CardHeader className="flex-1">
                          {manufacturer.logo ? (
                            <div className="w-full h-[120px] relative mb-4">
                              <Image
                                src={urlFor(manufacturer.logo)
                                  .width(600)
                                  .height(300)
                                  .fit('max')
                                  .url()}
                                alt={manufacturer.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="h-[120px] flex items-center justify-center mb-4">
                              <CardTitle className="text-center text-lg">
                                {manufacturer.name}
                              </CardTitle>
                            </div>
                          )}
                        </CardHeader>
                        {(manufacturer.description || manufacturer.website) && (
                          <CardContent>
                            {manufacturer.description && (
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {manufacturer.description}
                              </p>
                            )}
                          </CardContent>
                        )}
                        <CardFooter className="pt-0">
                          {manufacturer.website ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <a
                                href={manufacturer.website}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Visit Website
                              </a>
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <Link href="/contact">Request Info</Link>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  {categoryIndex < categoriesWithManufacturers.length - 1 && (
                    <Separator className="my-8" />
                  )}
                </div>
              ))
            )}
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
