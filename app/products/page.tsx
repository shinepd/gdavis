import { Separator } from '@/components/ui/separator';
import { CtaSection } from '@/components/sections/cta-section';
import { getManufacturersByCategory, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default async function ProductsPage() {
  const categoriesWithManufacturers = await getManufacturersByCategory();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 relative overflow-hidden">
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
      <section className="w-full pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {categoriesWithManufacturers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No product categories found. Please add manufacturers with
                  categories in Sanity Studio.
                </p>
              </div>
            ) : (
              categoriesWithManufacturers.map((category) => (
                <div key={category.id} id={category.id}>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight mb-1">
                      {category.title}
                    </h2>
                    {category.description && (
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {category.manufacturers.map((manufacturer) => {
                      const CardWrapper = manufacturer.website ? 'a' : 'div';
                      const cardProps = manufacturer.website
                        ? {
                            href: manufacturer.website,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          }
                        : {};

                      return (
                        <CardWrapper
                          key={manufacturer._id}
                          {...cardProps}
                          className={`group relative bg-card border rounded-lg p-4 flex flex-col items-center justify-center aspect-[4/3] transition-all duration-200 ${
                            manufacturer.website
                              ? 'hover:border-primary hover:shadow-md cursor-pointer'
                              : ''
                          }`}
                        >
                          {manufacturer.logo ? (
                            <Image
                              src={urlFor(manufacturer.logo)
                                .width(400)
                                .fit('max')
                                .url()}
                              alt={manufacturer.name}
                              width={160}
                              height={80}
                              className="object-contain max-h-[60px] w-auto transition-transform duration-200 group-hover:scale-105"
                            />
                          ) : (
                            <span className="text-sm font-medium text-center">
                              {manufacturer.name}
                            </span>
                          )}
                          {manufacturer.website && (
                            <ExternalLink className="absolute top-2 right-2 h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </CardWrapper>
                      );
                    })}
                  </div>
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
