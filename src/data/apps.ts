// The iPhone apps on the App Store, as the site names and prices them.
// App Store links live in appstore.ts.
import type { AppSlug } from './appstore';

export const APPS: Record<AppSlug, { name: string; price: string | null }> = {
  breathebody: { name: 'Breath Body', price: '$0.99' },
  fishingforcompliments: { name: 'Fishing for Compliments', price: null },
  mybussf: { name: 'My Bus SF', price: '$0.99' },
  'olivers-train': { name: 'Oliver’s Train', price: '$0.99' },
  pingpongcowboy: { name: 'Ping Pong Cowboy', price: '$0.99' },
  simpleoutage: { name: 'Simple Outages', price: 'Free' },
};

/** Price for a meta line, or "Price TBC" until it's set. */
export const priceOf = (app: AppSlug) => APPS[app].price ?? 'Price TBC';

/** Every app page on the site, A to Z, for the footer: the apps above plus
 *  Simple LatLon. `platform` is set where it isn't iPhone. */
export const APP_PAGES: { href: string; name: string; platform?: string }[] = [
  ...Object.entries(APPS).map(([slug, a]) => ({ href: `/${slug}`, name: a.name })),
  { href: '/simplelatlon', name: 'Simple LatLon', platform: 'Mac' },
].sort((a, b) => a.name.localeCompare(b.name));
