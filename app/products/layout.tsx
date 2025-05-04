import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | G. Davis & Associates',
  description:
    'Explore our extensive range of high-quality architectural products for your design and construction needs.',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
