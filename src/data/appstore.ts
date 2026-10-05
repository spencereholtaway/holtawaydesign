// Replace null with the "https://apps.apple.com/..." link when each app goes live.
export const APP_STORE = {
  breathebody: 'https://apps.apple.com/us/app/breath-body/id6819162493',
  fishingforcompliments: null,
  mybussf: 'https://apps.apple.com/us/app/mybussf-2026/id6814334469',
  'olivers-train': null,
  pingpongcowboy: null,
} as const satisfies Record<string, string | null>;

export type AppSlug = keyof typeof APP_STORE;
