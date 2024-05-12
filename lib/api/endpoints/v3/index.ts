import { account } from '~/api/endpoints/v3/account.endpoint';
import { authentification } from '~/api/endpoints/v3/authentication.endpoint';
import { certifications } from '~/api/endpoints/v3/certifications.endpoint';
import { changes } from '~/api/endpoints/v3/changes.endpoint';
import { collections } from '~/api/endpoints/v3/collections.endpoint';
import { companies } from '~/api/endpoints/v3/companies.endpoint';
import { configuration } from '~/api/endpoints/v3/configuration.endpoint';
import { credits } from '~/api/endpoints/v3/credits.endpoint';
import { discover } from '~/api/endpoints/v3/discover.endpoint';
import { episodes } from '~/api/endpoints/v3/episodes.endpoint';
import { find } from '~/api/endpoints/v3/find.endpoint';
import { genres } from '~/api/endpoints/v3/genres.endpoint';
import { keywords } from '~/api/endpoints/v3/keywords.endpoint';
import { list } from '~/api/endpoints/v3/lists.endpoint';
import { movies } from '~/api/endpoints/v3/movies.endpoint';
import { networks } from '~/api/endpoints/v3/networks.endpoint';
import { people } from '~/api/endpoints/v3/people.endpoint';
import { reviews } from '~/api/endpoints/v3/reviews.endpoint';
import { search } from '~/api/endpoints/v3/search.endpoint';
import { seasons } from '~/api/endpoints/v3/sesons.endpoint';
import { shows } from '~/api/endpoints/v3/shows.endpoint';
import { trending } from '~/api/endpoints/v3/trending.endpoint';

export const v3 = {
  account,
  authentification,
  certifications,
  changes,
  collections,
  companies,
  configuration,
  credits,
  discover,
  find,
  genres,
  keywords,
  list,
  movies,
  networks,
  people,
  reviews,
  search,
  trending,
  shows,
  seasons,
  episodes,
};
