import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Our Reps in Leawood, KS',
  description:
    'Interior and exterior lines are handled by separate representatives. Reach our Leawood, Kansas office for samples, specifications, preliminary budgets, or continuing education sessions.',
  path: '/contact',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
