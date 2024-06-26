import { HttpMethod } from '@dvcol/common-utils/http';

import type { TmdbCredit } from '~/models/tmdb-credit.model';

import { TmdbClientEndpoint } from '~/models/tmdb-client.model';

export const credits = {
  /**
   * Get a movie or TV credit details by ID.
   *
   * @version 3
   *
   * @see [credit-details]{@link https://developer.themoviedb.org/reference/credit-details}
   */
  details: new TmdbClientEndpoint<
    {
      credit_id: string;
    },
    TmdbCredit
  >({
    method: HttpMethod.GET,
    url: '/credit/:credit_id',
    opts: {
      version: 3,
      parameters: {
        path: {
          credit_id: true,
        },
      },
    },
  }),
};
