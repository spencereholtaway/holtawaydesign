// Markdown plugin: images on lines of their own become <figure class="shots">
// blocks, styled by what each image is (see shots.mjs). Images one after
// another, with no text between, share a figure and sit side by side. An
// image's title (![alt](src "title")) becomes the caption.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { classifyShot, groupOf, TINTS, displayWidth } from './shots.mjs';

const isImg = (n) => n.type === 'element' && n.tagName === 'img';
const isGap = (n) => (n.type === 'text' && !n.value.trim()) || (n.type === 'element' && n.tagName === 'br');
const isLocal = (src) => src && !/^([a-z][a-z0-9+.-]*:|\/)/i.test(src);

/** Largest width each kind is shown at, and the sizes hint for the browser. Astro
 *  makes copies from about a third of that up to twice it, for sharp screens. */
const RESPONSIVE = {
  phone: { width: 360, sizes: '(max-width: 719px) 45vw, 300px' },
  window: { width: 960, sizes: '(max-width: 719px) 100vw, 900px' },
  screen: { width: 960, sizes: '(max-width: 719px) 100vw, 900px' },
  photo: { width: 1280, sizes: '(max-width: 719px) 100vw, 75vw' },
  portrait: { width: 560, sizes: '(max-width: 719px) 100vw, 560px' },
};

async function measure(file) {
  const img = sharp(file);
  const m = await img.metadata();
  const swap = (m.orientation ?? 1) >= 5; // camera photos stored on their side
  let transparentCorner = false;
  if (m.hasAlpha) {
    const px = await sharp(file).extract({ left: 0, top: 0, width: 1, height: 1 }).ensureAlpha().raw().toBuffer();
    transparentCorner = px[3] < 250;
  }
  return { width: swap ? m.height : m.width, height: swap ? m.width : m.height, format: m.format, transparentCorner };
}

/** The images in a paragraph that holds nothing else, or null. */
function imagesOnly(node) {
  if (node?.type !== 'element' || node.tagName !== 'p') return null;
  const kids = node.children.filter((n) => !isGap(n));
  return kids.length && kids.every(isImg) ? kids : null;
}
const isBlankText = (n) => n?.type === 'text' && !n.value.trim();

export const shotsPlugin = {
  name: 'blog-shots',
  element: {
    filter: ['p'],
    async visit(node, ctx) {
      const own = imagesOnly(node);
      if (!own || !ctx.fileURL) return;
      const dir = path.dirname(fileURLToPath(ctx.fileURL));

      // A run of image-only paragraphs is handled by its first one; the rest are removed.
      const siblings = ctx.parent(node)?.children ?? [];
      const at = ctx.indexOf(node) ?? 0;
      let prev = at - 1;
      while (isBlankText(siblings[prev])) prev--;
      if (imagesOnly(siblings[prev])) {
        ctx.removeNode(node);
        return;
      }
      const kids = [...own];
      for (let next = at + 1; next < siblings.length; next++) {
        if (isBlankText(siblings[next])) continue;
        const more = imagesOnly(siblings[next]);
        if (!more) break;
        kids.push(...more);
      }

      const items = [];
      for (const img of kids) {
        const src = String(img.properties?.src ?? '');
        let kind = 'photo';
        let width;
        if (isLocal(src)) {
          try {
            const m = await measure(path.resolve(dir, decodeURI(src)));
            kind = classifyShot(m);
            width = m.width;
          } catch {
            // Unreadable: Astro reports missing images itself; show it as a photo.
          }
        }
        items.push({ img, kind, width });
      }

      const groups = [];
      for (const it of items) {
        const g = groupOf(it.kind);
        const last = groups.at(-1);
        if (last && last.g === g) last.items.push(it);
        else groups.push({ g, items: [it] });
      }

      const figures = groups.map(({ g, items }, i) => {
        const caption = items.map((it) => it.img.properties?.title).filter(Boolean).join(' ');
        const tint = g === 'photos' ? undefined : `--tint:var(${TINTS[(at + i) % TINTS.length]})`;
        return {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['shots', `shots--${g}`, `shots--n${Math.min(items.length, 3)}`], style: tint },
          children: [
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['shots__panel'] },
              children: items.map(({ img, kind, width }) => {
                const { title, ...props } = img.properties ?? {};
                const w = displayWidth(kind, width);
                return {
                  type: 'element',
                  tagName: 'div',
                  properties: { className: ['shot', `shot--${kind}`], style: w ? `--w:${w}px` : undefined },
                  // Astro's "constrained" layout makes the srcset. (A `widths` list can't be passed:
                  // the Markdown pipeline drops array properties.)
                  children: [{ ...img, properties: { ...props, layout: 'constrained', width: String(RESPONSIVE[kind].width), sizes: RESPONSIVE[kind].sizes } }],
                };
              }),
            },
            ...(caption ? [{ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: caption }] }] : []),
          ],
        };
      });
      ctx.replaceNode(node, figures);
    },
  },
};
