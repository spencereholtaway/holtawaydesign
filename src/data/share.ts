// Where the share page (/share) can send a post. Each target opens that
// platform's own compose or submit screen, filled in; nothing is posted until
// you press Post there. No accounts, keys or API calls.

export interface ShareInput {
  /** The editable share text. */
  text: string;
  url: string;
  title: string;
}

export interface ShareTarget {
  id: string;
  label: string;
  /** Character limit for text + link, shown as a counter. */
  limit?: number;
  /** How many characters the link counts as, if not its length (X counts every link as 23). */
  linkCost?: number;
  /** What to put on the clipboard first, for platforms that can't be pre-filled. */
  copy?: 'text' | 'url';
  /** Shown in the toast after copying. */
  hint?: string;
  href: (s: ShareInput) => string;
}

const e = encodeURIComponent;
const withLink = (s: ShareInput) => `${s.text}\n\n${s.url}`;

export const SHARE_TARGETS: ShareTarget[] = [
  { id: 'bluesky', label: 'Bluesky', limit: 300, href: (s) => `https://bsky.app/intent/compose?text=${e(withLink(s))}` },
  { id: 'threads', label: 'Threads', limit: 500, href: (s) => `https://www.threads.net/intent/post?text=${e(withLink(s))}` },
  { id: 'x', label: 'X', limit: 280, linkCost: 23, href: (s) => `https://x.com/intent/post?text=${e(s.text)}&url=${e(s.url)}` },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    copy: 'text',
    hint: 'Text copied. LinkedIn can’t be pre-filled, so paste it in.',
    href: (s) => `https://www.linkedin.com/sharing/share-offsite/?url=${e(s.url)}`,
  },
  { id: 'hn', label: 'Hacker News', href: (s) => `https://news.ycombinator.com/submitlink?u=${e(s.url)}&t=${e(s.title)}` },
  { id: 'reddit', label: 'Reddit', href: (s) => `https://www.reddit.com/submit?url=${e(s.url)}&title=${e(s.title)}` },
  {
    id: 'medium',
    label: 'Medium import',
    copy: 'url',
    hint: 'Link copied. Paste it into Medium’s import box; it credits your site as the original.',
    href: () => 'https://medium.com/p/import',
  },
];

/** Text length the way people count it: emoji and accented letters are one each. */
export function graphemes(s: string): number {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    let n = 0;
    for (const _ of new Intl.Segmenter().segment(s)) n++;
    return n;
  }
  return [...s].length;
}

/** Characters a post would use on a target with a limit: text, a blank line, then the link. */
export const shareLength = (t: ShareTarget, s: ShareInput) =>
  graphemes(s.text) + 2 + (t.linkCost ?? graphemes(s.url));
