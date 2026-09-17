'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { HERO_SLIDES } from '@/lib/hero-slides';
import { cn } from '@/lib/utils';

/** How long each frame holds before the next one crossfades in. */
const DWELL_MS = 5000;
/** Crossfade duration. */
const FADE_MS = 900;
/** Horizontal travel, in px, that counts as a swipe rather than a tap. */
const SWIPE_PX = 44;

/**
 * Art-directed hero for the home page: a stack of full-bleed photographs that
 * crossfade on a timer, with a caption naming the building and a segmented
 * progress rail for manual control.
 *
 * Motion is opt-out at three levels, because an auto-advancing hero is hostile
 * otherwise: `prefers-reduced-motion` disables rotation entirely, pointer or
 * keyboard focus inside the region pauses it, and a backgrounded tab pauses it
 * so a returning visitor does not find the deck several frames along.
 *
 * All frames are mounted at once and toggled with opacity. Only the first is
 * `priority`; the rest lazy-load, and each carries an inline blur preview so a
 * frame never appears as a hole mid-fade.
 *
 * Only the incoming frame animates. Fading both at once would leave the stack
 * partly transparent through the middle of the transition and wash the
 * container's own background into the photograph, so the outgoing frame holds
 * full opacity underneath and snaps away once it is completely covered.
 */
export function HeroCarousel({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Highest frame whose <Image> has been mounted. Every frame overlaps the
  // viewport, so leaving them all mounted makes the browser fetch the whole
  // deck on first paint - roughly a megabyte nobody has asked to see yet.
  const [reach, setReach] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const count = HERO_SLIDES.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);

    sync();
    query.addEventListener('change', sync);

    return () => query.removeEventListener('change', sync);
  }, []);

  // A hidden tab still fires timers, so without this the deck advances while
  // nobody is watching and jumps on return.
  useEffect(() => {
    const sync = () => setPaused(document.hidden);

    document.addEventListener('visibilitychange', sync);

    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  // One frame ahead of wherever the visitor is, so the next fade has its
  // photograph decoded before it starts.
  useEffect(() => setReach((current) => Math.max(current, index + 1)), [index]);

  useEffect(() => {
    if (paused || reduced || count < 2) return;

    const timer = window.setTimeout(() => go(index + 1), DWELL_MS);

    return () => window.clearTimeout(timer);
  }, [count, go, index, paused, reduced]);

  const active = HERO_SLIDES[index];

  return (
    <div
      className={cn(
        // A flat backdrop rather than the site's placeholder stripes: every
        // frame here is a real photograph, so this only ever shows for the
        // instant before the first blur preview paints.
        'relative isolate overflow-hidden rounded-md bg-swatch',
        // The 21:8 window is the design's proportion but collapses to a letter
        // slot on a phone, so the crop opens up as the viewport narrows.
        'aspect-[3/2] md:aspect-[2/1] lg:aspect-[21/8]',
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(document.hidden)}
      onFocusCapture={(event) => {
        // Keyboard focus only. Clicking a control also focuses it, and pausing
        // on that would strand the deck until the visitor clicked elsewhere.
        if (
          event.target instanceof Element &&
          event.target.matches(':focus-visible')
        ) {
          setPaused(true);
        }
      }}
      onBlurCapture={() => setPaused(document.hidden)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(index + 1);
        else if (event.key === 'ArrowLeft') go(index - 1);
        else return;

        event.preventDefault();
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        touchStartX.current = null;

        if (start === null) return;

        const travel = event.changedTouches[0].clientX - start;

        if (Math.abs(travel) < SWIPE_PX) return;

        go(index + (travel < 0 ? 1 : -1));
      }}
    >
      {HERO_SLIDES.map((slide, slideIndex) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          aria-hidden={slideIndex !== index}
          style={{
            opacity: slideIndex === index ? 1 : 0,
            // The incoming frame sits above the one it is replacing, which is
            // what lets the outgoing frame stay opaque for the whole fade.
            zIndex: slideIndex === index ? 1 : 0,
            transition: reduced
              ? 'none'
              : slideIndex === index
                ? `opacity ${FADE_MS}ms ease-out`
                : // Not a fade out: a hard cut, held until the incoming frame
                  // has finished covering this one.
                  `opacity 0ms linear ${FADE_MS + 60}ms`,
          }}
        >
          {slideIndex <= reach && (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 1360px) 100vw, 1280px"
              priority={slideIndex === 0}
              placeholder="blur"
              blurDataURL={slide.blurDataURL}
              className="object-cover"
              style={{ objectPosition: slide.objectPosition }}
            />
          )}
        </div>
      ))}

      {/* Scrim. The photographs run from a night exterior to a white-walled
          interior, so the caption needs its own contrast rather than relying
          on whichever frame happens to be up. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[52%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-[3] flex flex-wrap items-end justify-between gap-x-6 gap-y-4 p-5 md:p-7">
        <Caption slide={active} />

        {count > 1 && (
          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Choose a project"
          >
            {HERO_SLIDES.map((slide, slideIndex) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(slideIndex)}
                aria-label={slide.title}
                aria-current={slideIndex === index}
                className="group relative h-6 w-7 cursor-pointer focus-visible:outline-none"
              >
                {/* The hit target is 24px tall for touch; the rail it draws is
                    a 2px hairline centred inside it. */}
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/30 transition-colors group-hover:bg-white/50 group-focus-visible:bg-white/60">
                  <span
                    // Re-keyed per slide so the fill animation restarts rather
                    // than resuming mid-sweep on the next frame.
                    key={index}
                    className="block h-full origin-left rounded-full bg-white"
                    style={
                      slideIndex === index
                        ? reduced
                          ? { transform: 'scaleX(1)' }
                          : {
                              animation: `hero-rail ${DWELL_MS}ms linear forwards`,
                              animationPlayState: paused ? 'paused' : 'running',
                            }
                        : { transform: 'scaleX(0)' }
                    }
                  />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Caption({ slide }: { slide: HeroSlideCaption }) {
  const body = (
    <>
      <span className="block text-[15px] font-medium tracking-[-0.01em] text-white md:text-[17px]">
        {slide.title}
      </span>
      <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/70">
        {slide.detail}
      </span>
    </>
  );

  if (!slide.href) {
    return <div className="max-w-[46ch]">{body}</div>;
  }

  return (
    <Link
      href={slide.href}
      className="max-w-[46ch] border-b border-transparent pb-1 transition-colors hover:border-white/60 hover:text-white"
    >
      {body}
    </Link>
  );
}

type HeroSlideCaption = Pick<
  (typeof HERO_SLIDES)[number],
  'title' | 'detail' | 'href'
>;
