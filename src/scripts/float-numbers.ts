// The big case numbers lean toward the mouse: each tilts a few degrees and its
// 3D sides swing the other way. Eased every frame so it drifts rather than
// snaps. Mouse and trackpad only, and off under prefers-reduced-motion.
const nums = [...document.querySelectorAll<HTMLElement>('[data-float]')];
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (nums.length && fine && !reduce) {
  const state = nums.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }));
  let px = innerWidth / 2;
  let py = innerHeight / 2;
  let frame = 0;

  const tick = () => {
    frame = 0;
    let moving = false;
    nums.forEach((el, i) => {
      const s = state[i];
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      // Where the mouse is relative to this number, -1 to 1 across the window.
      s.tx = Math.max(-1, Math.min(1, (px - (r.left + r.width / 2)) / (innerWidth / 2)));
      s.ty = Math.max(-1, Math.min(1, (py - (r.top + r.height / 2)) / (innerHeight / 2)));
      s.x += (s.tx - s.x) * 0.08;
      s.y += (s.ty - s.y) * 0.08;
      if (Math.abs(s.tx - s.x) > 0.001 || Math.abs(s.ty - s.y) > 0.001) moving = true;
      el.style.setProperty('--ry', (s.x * 9).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (s.y * -7).toFixed(2) + 'deg');
      el.style.setProperty('--ex', (0.35 - s.x * 0.75).toFixed(3));
      el.style.setProperty('--ey', (0.45 - s.y * 0.75).toFixed(3));
    });
    if (moving) frame = requestAnimationFrame(tick);
  };
  const kick = () => { if (!frame) frame = requestAnimationFrame(tick); };

  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; kick(); }, { passive: true });
  addEventListener('scroll', kick, { passive: true });
}
