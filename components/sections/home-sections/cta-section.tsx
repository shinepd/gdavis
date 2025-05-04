import { Container } from '@/components/ui/container';
import { CtaContent } from './cta-content';

export function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24">
      <Container>
        <CtaContent />
      </Container>
    </section>
  );
}
