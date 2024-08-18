import type { TmdbClientSettings } from '~/models/tmdb-client.model';

import { Config } from '~/config';

export const tmdbClientSettings: TmdbClientSettings = {
  endpoint: Config.Endpoint,
  useragent: 'my-user-agent',
  apiKey: 'my-api-key',
  readToken: 'my-read-token',
  requestTokenTTL: Config.RequestTokenTTL,
};
