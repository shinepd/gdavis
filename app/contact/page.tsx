import { Separator } from '@/components/ui/separator';
import { ContactHero } from '@/components/sections/contact-hero';
import { ContactForm } from '@/components/sections/contact-form';

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <ContactHero />
      <ContactForm />
      <Separator />
    </div>
  );
}
