// [data-reveal] elements that start below the fold fade up as they scroll in.
// Off under prefers-reduced-motion.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.style.opacity = '1';
        el.style.transform = 'none';
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top <= innerHeight) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity var(--dur-reveal) ease, transform var(--dur-reveal) var(--ease-out)';
    io.observe(el);
  });
}
