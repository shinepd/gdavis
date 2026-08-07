/**
 * Inline style that staggers a card grid's scroll reveal by `step` ms per
 * column. Lives outside the client component so server-rendered grids can use
 * it too.
 */
export function revealDelay(index: number, columns = 4, step = 65) {
  return { animationDelay: `${(index % columns) * step}ms` };
}
