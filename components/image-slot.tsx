import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ImageSlotProps {
  /** Resolved image URL. When absent the striped placeholder is shown. */
  src?: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. "4 / 3". Omit when the parent sets the height. */
  aspect?: string;
  /** Caption shown bottom-left when no image is available. */
  caption?: string;
  sizes?: string;
  priority?: boolean;
  /** Large slots use the wider 11px/22px stripe and a 4px radius. */
  large?: boolean;
  objectPosition?: string;
  className?: string;
}

/**
 * A fixed-aspect image slot. With a source it renders a cropped `next/image`;
 * without one it falls back to the design's diagonal swatch stripes so layout
 * never shifts while photography is still being sourced.
 */
export function ImageSlot({
  src,
  alt = '',
  aspect,
  caption,
  sizes = '(max-width: 768px) 100vw, (max-width: 1360px) 50vw, 680px',
  priority = false,
  large = false,
  objectPosition,
  className,
}: ImageSlotProps) {
  return (
    <div
      className={cn(
        'relative flex items-end overflow-hidden',
        large ? 'swatch-stripes-lg rounded-md' : 'swatch-stripes rounded-sm',
        className
      )}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : (
        caption && (
          <span
            className={cn(
              'relative font-mono text-ink-3 tracking-[0.08em]',
              large ? 'p-5 text-[11px]' : 'p-3 text-[10px]'
            )}
          >
            {caption}
          </span>
        )
      )}
    </div>
  );
}
