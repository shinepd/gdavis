import { Separator } from '@/components/ui/separator';
import { AboutHero } from '@/components/sections/about-hero';
import { AboutHistory } from '@/components/sections/about-history';
import { AboutValues } from '@/components/sections/about-values';
import { AboutTeam } from '@/components/sections/about-team';
import { AboutContact } from '@/components/sections/about-contact';

export const metadata = {
  title: 'About Us | G. Davis & Associates',
  description:
    "Learn about G. Davis & Associates, a manufacturer's representative firm providing high-quality architectural products and exceptional service.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <AboutHero />
      <AboutHistory />
      <AboutValues />
      <AboutTeam />
      <AboutContact />
      <Separator />
    </div>
  );
}
