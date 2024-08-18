export const Config = {
  Endpoint: 'https://api.themoviedb.org',
  Website: 'https://www.themoviedb.org',
  RequestTokenTTL: 15 * 60 * 1000,
  RequestTokenUrl: 'https://www.themoviedb.org/auth/access?request_token=',
} as const;
