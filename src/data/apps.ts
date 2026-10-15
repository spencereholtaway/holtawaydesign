// The five apps, as the homepage and the portfolio name and price them.
// App Store links live in appstore.ts.
import type { AppSlug } from './appstore';

export const APPS: Record<AppSlug, { name: string; price: string | null }> = {
  breathebody: { name: 'Breath Body', price: '$0.99' },
  fishingforcompliments: { name: 'Fishing for Compliments', price: null },
  mybussf: { name: 'My Bus SF', price: '$0.99' },
  'olivers-train': { name: 'Oliver’s Train', price: null },
  pingpongcowboy: { name: 'Ping Pong Cowboy', price: '$0.99' },
};

/** Price for a meta line, or "Price TBC" until it's set. */
export const priceOf = (app: AppSlug) => APPS[app].price ?? 'Price TBC';
