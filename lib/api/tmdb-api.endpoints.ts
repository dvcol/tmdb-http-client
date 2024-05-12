import { v3 } from '~/api/endpoints/v3';
import { v4 } from '~/api/endpoints/v4';

export const tmdbApi = {
  v3,
  v4,
};

export type TmdbApi = typeof tmdbApi;
