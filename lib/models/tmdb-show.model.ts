import type { TmdbCompany } from '~/models/tmdb-company.model';
import type { EntityTypes, Extended, Short, TmdbAccountRating, TmdbCountry, TmdbGenre, TmdbLanguage, TmdbNetwork } from '~/models/tmdb-entity.model';
import type { TmdbEpisode } from '~/models/tmdb-episode.model';
import type { TmdbImageShort } from '~/models/tmdb-image.model';
import type { TmdbSeason } from '~/models/tmdb-season.model';

export type TmdbPersonShow = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type TmdbShowShort = {
  media_type?: 'tv';
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  /** First air date of the show (YYYY-MM-DD) */
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export const TmdbShowStatus = {
  ReturningSeries: 'Returning Series',
  Planned: 'Planned',
  InProduction: 'In Production',
  Ended: 'Ended',
  Cancelled: 'Cancelled',
  Pilot: 'Pilot',
} as const;

export type TmdbShowStatuses = (typeof TmdbShowStatus)[keyof typeof TmdbShowStatus];

export const TmdbShowType = {
  Documentary: 'Documentary',
  News: 'News',
  Miniseries: 'Miniseries',
  Reality: 'Reality',
  Scripted: 'Scripted',
  TalkShow: 'Talk Show',
  Video: 'Video',
} as const;

export type TmdbShowTypes = (typeof TmdbShowType)[keyof typeof TmdbShowType];

export type TmdbShowExtended = TmdbShowShort & {
  created_by: TmdbPersonShow[];
  episode_run_time: number[];
  genres: TmdbGenre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air?: TmdbEpisode & { show_id: number };
  next_episode_to_air?: TmdbEpisode & { show_id: number };
  networks: TmdbNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: TmdbCompany[];
  production_countries: TmdbCountry[];
  seasons: TmdbSeason[];
  spoken_languages: TmdbLanguage[];
  status: string | TmdbShowStatuses;
  tagline: string;
  type: string | TmdbShowTypes;
};

export type TmdbShow<T extends EntityTypes = Short> = T extends Extended
  ? TmdbShowExtended
  : T extends Short
    ? TmdbShowShort
    : TmdbShowShort | TmdbShowExtended;

export type TmdbShowRating = TmdbShowShort & {
  account_rating: TmdbAccountRating;
};
export type TmdbShowGuestRating = TmdbShowShort & {
  rating: number;
};

export type TmdbShowImages = {
  id: number;
  backdrops: TmdbImageShort[];
  posters: TmdbImageShort[];
  logos: TmdbImageShort[];
};

export type TmdbScreenedShow = {
  id: number;
  episode_number: number;
  season_number: number;
};
