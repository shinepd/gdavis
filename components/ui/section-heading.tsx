import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'space-y-3 mb-8',
        centered && 'text-center mx-auto',
        className
      )}
    >
      <h2 className="font-heading uppercase tracking-wider text-3xl sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-[700px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
