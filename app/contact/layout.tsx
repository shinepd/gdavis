import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | G. Davis & Associates',
  description:
    'Interior and exterior lines are handled by separate representatives. Reach out for samples, specifications, preliminary budgets, or continuing education sessions.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
