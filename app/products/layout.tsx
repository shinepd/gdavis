import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Rainscreens, Ceilings & Cladding',
  description:
    'Rainscreens, cladding, acoustical and metal ceilings, architectural glass, and composite stone lines represented across Kansas, Missouri, Iowa, and Nebraska, with technical support from specification through installation.',
  path: '/products',
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
