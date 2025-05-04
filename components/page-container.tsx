import { ReactNode } from 'react';
import { Container } from '@/components/ui/container';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={className}>
      <Container className="py-8 md:py-12">{children}</Container>
    </div>
  );
}
