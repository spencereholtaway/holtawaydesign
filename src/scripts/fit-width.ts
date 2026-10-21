// Big one-line words ([data-fit-width]: the section words and "Say hello.")
// shrink to fit their box instead of running off the page. They never grow
// past their CSS size, so on roomy screens nothing changes.
const els = [...document.querySelectorAll<HTMLElement>('[data-fit-width]')];

function fit(el: HTMLElement) {
  el.style.fontSize = '';
  const max = parseFloat(getComputedStyle(el).fontSize);
  const range = document.createRange();
  range.selectNodeContents(el);
  // Room for the last letter's overhang and the 3D full stop's depth.
  const needed = range.getBoundingClientRect().width + 0.12 * max;
  const room = el.clientWidth;
  if (needed > room && room > 0) el.style.fontSize = (max * room) / needed + 'px';
}

if (els.length) {
  const all = () => els.forEach(fit);
  all();
  addEventListener('resize', all, { passive: true });
  document.fonts?.ready.then(all);
}
