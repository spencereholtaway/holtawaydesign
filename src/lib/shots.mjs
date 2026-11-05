// How a blog image is presented, decided from its shape and file type. Shared
// by the Markdown pipeline (markdown-shots.mjs, at build time) and the editor's
// preview (src/pages/admin.astro), so both lay images out the same way.
//
//   phone    iPhone screenshot (tall: about 2.17 high per 1 wide). Phone frame on a tinted panel.
//   window   Mac window screenshot (a PNG with transparent corners, macOS's own
//            shadow included). On a tinted panel, as is.
//   screen   Any other screenshot (a PNG: a whole Mac screen, an iPad, a crop).
//            Rounded corners and a soft shadow on a tinted panel.
//   photo    Camera photos (JPEG, HEIC, WebP). Full width, no panel.
//   portrait An upright photo: kept narrower so it doesn't fill the screen.

/**
 * @param {{ width: number, height: number, format?: string, transparentCorner?: boolean }} m
 * @returns {'phone' | 'window' | 'screen' | 'photo' | 'portrait'}
 */
export function classifyShot({ width, height, format = '', transparentCorner = false }) {
  const tall = height / width;
  if (tall >= 1.9 && tall <= 2.4) return 'phone';
  const f = format.toLowerCase();
  if (transparentCorner) return 'window';
  if (f === 'png' || f === 'gif') return 'screen';
  return tall > 1.05 ? 'portrait' : 'photo';
}

/** Kinds that sit side by side in one figure when they're in the same paragraph. */
export const groupOf = (kind) => (kind === 'phone' ? 'phones' : kind === 'window' || kind === 'screen' ? 'screens' : 'photos');

/** Panel colours, from tokens.css ("Mixed tints"), taken in turn down the post. */
export const TINTS = ['--p-bus', '--p-calm', '--p-chip', '--p-pge', '--p-parent', '--p-flight', '--p-divorce'];

/** Screenshots are taken at 2x, so a screenshot is shown no wider than half its pixel width. */
export const displayWidth = (kind, width) => (kind === 'window' || kind === 'screen' ? Math.round(width / 2) : undefined);
