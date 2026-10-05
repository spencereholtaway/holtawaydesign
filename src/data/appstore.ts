// Replace null with the "https://apps.apple.com/..." link when each app goes live.
export const APP_STORE = {
  breathebody: null,
  fishingforcompliments: null,
  mybussf: null,
  'olivers-train': null,
  pingpongcowboy: null,
} as const satisfies Record<string, string | null>;

export type AppSlug = keyof typeof APP_STORE;
