// Hover tilt shared by the recent-work tiles and the "Five more." cards. The
// [data-tilt-panel] inside each [data-tilt] leans toward the cursor and lifts
// a touch (CSS in system.css). Mouse and trackpad only, and off under
// prefers-reduced-motion.
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (fine && !reduce) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((tile) => {
    const panel = tile.querySelector<HTMLElement>('[data-tilt-panel]');
    if (!panel) return;
    let x = 0.5;
    let y = 0.5;
    let frame = 0;
    const apply = () => {
      frame = 0;
      panel.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
      panel.style.setProperty('--ry', ((x - 0.5) * 10).toFixed(2) + 'deg');
    };
    tile.addEventListener('pointerenter', () => panel.setAttribute('data-tilting', ''));
    tile.addEventListener('pointermove', (e) => {
      const r = panel.getBoundingClientRect();
      x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      if (!frame) frame = requestAnimationFrame(apply);
    });
    tile.addEventListener('pointerleave', () => {
      panel.removeAttribute('data-tilting');
      x = 0.5;
      y = 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    });
  });
}
