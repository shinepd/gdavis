'use client';

import { useEffect } from 'react';

/**
 * Drives the site-wide scroll reveal. Any element with the `rv` class fades and
 * rises into place the first time it scrolls into view; add an inline
 * `animationDelay` to stagger a grid. Because the observer lives here rather
 * than in a wrapper component, server components can opt in with a class name
 * and no extra DOM node is inserted into a grid.
 *
 * The revealed state is stored in `data-rv`, not a class - React rewrites
 * `className` on every render, which would strand a card at opacity 0 after a
 * filter change, but it leaves attributes it never rendered alone.
 *
 * `prefers-reduced-motion` is handled in CSS - `.rv` stays fully opaque there.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // A fast scroll or a jump to an anchor can carry an element from
          // below the fold to above it inside one frame, so it never reports
          // as intersecting. Reveal anything already past the viewport too,
          // otherwise it stays stranded at opacity 0.
          const scrolledPast =
            entry.boundingClientRect.bottom < (entry.rootBounds?.top ?? 0);

          if (!entry.isIntersecting && !scrolledPast) continue;

          entry.target.setAttribute('data-rv', 'in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    const observeAll = () => {
      document
        .querySelectorAll('.rv:not([data-rv])')
        .forEach((node) => observer.observe(node));
    };

    observeAll();

    // Client-rendered sections (filtered grids) mount after the first pass.
    // Bursts of mutations coalesce into a single scan per frame.
    let queued = 0;
    const mutations = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        observeAll();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (queued) cancelAnimationFrame(queued);
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
