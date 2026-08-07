import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | G. Davis & Associates',
  description:
    'Established interior and exterior product lines represented by G. Davis & Associates, with technical support from specification through installation.',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
