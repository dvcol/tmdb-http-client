import { HttpMethod } from '@dvcol/common-utils/http';

import { TmdbClientEndpoint, type TmdbPaginatedData, type TmdbParamPagination } from '~/models/tmdb-client.model';

/**
 * Changes v3 endpoints.
 */
export const changes = {
  /**
   * Get a list of all of the movie ids that have been changed in the past 24 hours.
   *
   * You can query this method up to 14 days at a time.
   * Use the start_date and end_date query parameters.
   * 100 items are returned per page.
   *
   * @version 3
   *
   * @see [movie-changes]{@link https://developer.themoviedb.org/reference/changes-movie-list}
   */
  movie: new TmdbClientEndpoint<
    {
      start_date?: string;
      end_date?: string;
    } & TmdbParamPagination,
    TmdbPaginatedData<{ id: number; adult: boolean }>
  >({
    method: HttpMethod.GET,
    url: '/movie/changes?page=&start_date=&end_date=',
    opts: {
      version: 3,
      parameters: {
        query: {
          start_date: false,
          end_date: false,
          page: false,
        },
      },
    },
  }),
  /**
   * Get a list of all of the person ids that have been changed in the past 24 hours.
   *
   * You can query this method up to 14 days at a time.
   * Use the start_date and end_date query parameters.
   * 100 items are returned per page.
   *
   * @version 3
   * @see [person-changes]{@link https://developer.themoviedb.org/reference/changes-people-list}
   */
  people: new TmdbClientEndpoint<
    {
      start_date?: string;
      end_date?: string;
    } & TmdbParamPagination,
    TmdbPaginatedData<{ id: number; adult: boolean }>
  >({
    method: HttpMethod.GET,
    url: '/person/changes?page=&start_date=&end_date=',
    opts: {
      version: 3,
      parameters: {
        query: {
          start_date: false,
          end_date: false,
          page: false,
        },
      },
    },
  }),
  /**
   * Get a list of all of the TV show ids that have been changed in the past 24 hours.
   *
   * You can query this method up to 14 days at a time.
   * Use the start_date and end_date query parameters.
   * 100 items are returned per page.
   *
   * @version 3
   * @see [tv-changes]{@link https://developer.themoviedb.org/reference/changes-tv-list}
   */
  tv: new TmdbClientEndpoint<
    {
      start_date?: string;
      end_date?: string;
    } & TmdbParamPagination,
    TmdbPaginatedData<{ id: number; adult: boolean }>
  >({
    method: HttpMethod.GET,
    url: '/tv/changes?page=&start_date=&end_date=',
    opts: {
      version: 3,
      parameters: {
        query: {
          start_date: false,
          end_date: false,
          page: false,
        },
      },
    },
  }),
};
