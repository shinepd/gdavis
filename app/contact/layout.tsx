import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | G. Davis & Associates',
  description:
    'Get in touch with G. Davis & Associates for information about our architectural products and services.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
