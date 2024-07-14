import type { TmdbMovieReleaseTypes } from '~/models/tmdb-movie.model';

export const TmdbDiscoverMonetizationType = {
  Flatrate: 'flatrate',
  Free: 'free',
  Ads: 'ads',
  Rent: 'rent',
  Buy: 'buy',
} as const;

export type TmdbDiscoverMonetizationTypes = (typeof TmdbDiscoverMonetizationType)[keyof typeof TmdbDiscoverMonetizationType];

export const TmdbDiscoverMovieSortBy = {
  OriginalTitleAsc: 'original_title.asc',
  OriginalTitleDesc: 'original_title.desc',
  PopularityAsc: 'popularity.asc',
  PopularityDesc: 'popularity.desc',
  RevenueAsc: 'revenue.asc',
  RevenueDesc: 'revenue.desc',
  PrimaryReleaseDateAsc: 'primary_release_date.asc',
  TitleAsc: 'title.asc',
  TitleDesc: 'title.desc',
  PrimaryReleaseDateDesc: 'primary_release_date.desc',
  VoteAverageAsc: 'vote_average.asc',
  VoteAverageDesc: 'vote_average.desc',
  VoteCountAsc: 'vote_count.asc',
  VoteCountDesc: 'vote_count.desc',
} as const;

export type TmdbDiscoverMovieSortBys = (typeof TmdbDiscoverMovieSortBy)[keyof typeof TmdbDiscoverMovieSortBy];

export type TmdbDiscoverMovieQuery = {
  /** use in conjunction with region */
  certification?: string;
  /** use in conjunction with region */
  'certification.gte'?: string;
  /** use in conjunction with region */
  'certification.lte'?: string;
  /** use in conjunction with the certification, certification.gte and certification.lte filters */
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  primary_release_year?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  region?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  /** Default?: popularity.desc */
  sort_by?: TmdbDiscoverMovieSortBys;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  watch_region?: string;
  /** can be a comma (AND) or pipe (OR) separated query */
  with_cast?: string | string[];
  /** can be a comma (AND) or pipe (OR) separated query */
  with_companies?: string | string[];
  /** can be a comma (AND) or pipe (OR) separated query */
  with_crew?: string | string[];
  /** can be a comma (AND) or pipe (OR) separated query */
  with_genres?: string | string[];
  /** can be a comma (AND) or pipe (OR) separated query */
  with_keywords?: string | string[];
  with_origin_country?: string;
  with_original_language?: string;
  /** can be a comma (AND) or pipe (OR) separated query */
  with_people?: string | string[];
  /** possible values are?: [1, 2, 3, 4, 5, 6] can be a comma (AND) or pipe (OR) separated query, can be used in conjunction with region */
  with_release_type?: string | TmdbMovieReleaseTypes[];
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  /** possible values are?: [flatrate, free, ads, rent, buy] use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
  with_watch_monetization_types?: string | TmdbDiscoverMonetizationTypes[];
  /** use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
  with_watch_providers?: string | string[];
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
};

export const TmdbDiscoverTvSortBy = {
  FirstAirDateAsc: 'first_air_date.asc',
  FirstAirDateDesc: 'first_air_date.desc',
  NameAsc: 'name.asc',
  NameDesc: 'name.desc',
  OriginalNameAsc: 'original_name.asc',
  OriginalNameDesc: 'original_name.desc',
  PopularityAsc: 'popularity.asc',
  PopularityDesc: 'popularity.desc',
  VoteAverageAsc: 'vote_average.asc',
  VoteAverageDesc: 'vote_average.desc',
  VoteCountAsc: 'vote_count.asc',
  VoteCountDesc: 'vote_count.desc',
} as const;

export type TmdbDiscoverTvSortBys = (typeof TmdbDiscoverTvSortBy)[keyof typeof TmdbDiscoverTvSortBy];

export const TmdbDiscoverShowType = {
  Documentary: 0,
  News: 1,
  Miniseries: 2,
  Reality: 3,
  Scripted: 4,
  TalkShow: 5,
  Video: 6,
} as const;

export type TmdbDiscoverShowTypes = (typeof TmdbDiscoverShowType)[keyof typeof TmdbDiscoverShowType];

export const TmdbDiscoverShowStatus = {
  ReturningSeries: 0,
  Planned: 1,
  InProduction: 2,
  Ended: 3,
  Cancelled: 4,
  Pilot: 5,
} as const;

export type TmdbDiscoverShowStatuses = (typeof TmdbDiscoverShowStatus)[keyof typeof TmdbDiscoverShowStatus];

export type TmdbDiscoverTvQuery = {
  'air_date.gte'?: string;
  'air_date.lte'?: string;
  first_air_date_year?: number;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
  include_adult?: boolean;
  include_null_first_air_dates?: boolean;
  language?: string;
  screened_theatrically?: boolean;
  /** Default?: popularity.desc */
  sort_by?: TmdbDiscoverTvSortBys;
  timezone?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  watch_region?: string;
  /** can be a comma (AND) or pipe (OR) separated query */
  with_companies?: string | string[];
  /** can be a comma (AND) or pipe (OR) separated query */
  with_genres?: string | string[];
  /** can be a comma (AND) or pipe (OR) separated query */
  with_keywords?: string | string[];
  with_networks?: number;
  with_origin_country?: string;
  with_original_language?: string;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  /** possible values are?: [0, 1, 2, 3, 4, 5], can be a comma (AND) or pipe (OR) separated query */
  with_status?: string | TmdbDiscoverShowStatuses[];
  /** possible values are?: [flatrate, free, ads, rent, buy] use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
  with_watch_monetization_types?: string | TmdbDiscoverMonetizationTypes[];
  /** use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query */
  with_watch_providers?: string | string[];
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  /** possible values are?: [0, 1, 2, 3, 4, 5, 6], can be a comma (AND) or pipe (OR) separated query */
  with_type?: string | TmdbDiscoverShowTypes[];
};
