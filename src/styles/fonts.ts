// Schibsted Grotesk, served from our own domain instead of Google Fonts so the
// portfolio doesn't wait on a third-party stylesheet before it can render.
import w400 from '@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-400-normal.woff2?url';
import w400i from '@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-400-italic.woff2?url';
import w500 from '@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-500-normal.woff2?url';
import w500i from '@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-500-italic.woff2?url';
import w600 from '@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-600-normal.woff2?url';
import w700 from '@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-700-normal.woff2?url';
import w800 from '@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-800-normal.woff2?url';

const faces = [
  { weight: 400, style: 'normal', url: w400 },
  { weight: 400, style: 'italic', url: w400i },
  { weight: 500, style: 'normal', url: w500 },
  { weight: 500, style: 'italic', url: w500i },
  { weight: 600, style: 'normal', url: w600 },
  { weight: 700, style: 'normal', url: w700 },
  { weight: 800, style: 'normal', url: w800 },
];

export const schibstedCss = faces
  .map((f) => `@font-face{font-family:'Schibsted Grotesk';font-style:${f.style};font-weight:${f.weight};font-display:swap;src:url(${f.url}) format('woff2')}`)
  .join('\n');

/** The weights above the fold: body copy, the hero and the section words. */
export const schibstedPreload = [w400, w700, w800];
