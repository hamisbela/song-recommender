export const LASTFM_CONFIG = {
  API_KEY: import.meta.env.VITE_LASTFM_API_KEY,
  BASE_URL: 'https://ws.audioscrobbler.com/2.0/',
  LIMIT: 10
} as const;