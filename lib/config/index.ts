export const Config = {
  endpoint: 'https://api.themoviedb.org',
  requestTokenTTL: 15 * 60 * 1000,
  requestTokenUrl: 'https://www.themoviedb.org/auth/access?request_token=',
} as const;
