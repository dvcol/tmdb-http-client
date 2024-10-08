import { BaseClient } from '@dvcol/base-http-client';
import { patchResponse, injectCorsProxyPrefix, parseUrl, injectUrlPrefix } from '@dvcol/base-http-client/utils/client';
import { BaseApiHeaders, BaseHeaderContentType } from '@dvcol/base-http-client/utils/http';

import type { TmdbApi } from '~/api/tmdb-api.endpoints';
import type {
  ITmdbApi,
  TmdbApiParam,
  TmdbApiQuery,
  TmdbApiResponse,
  TmdbApiResponseData,
  TmdbApiResponsePageData,
  TmdbApiTemplate,
  TmdbClientAuthentication,
  TmdbClientOptions,
  TmdbClientSettings,
  TmdbPaginatedData,
} from '~/models/tmdb-client.model';

/** Needed to type Object assignment */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging  -- To allow type extension
export interface BaseTmdbClient extends TmdbApi {}

const isPageResponse = (response: TmdbApiResponseData | TmdbApiResponsePageData): response is TmdbApiResponsePageData =>
  'page' in response && 'total_pages' in response && 'total_results' in response;

export const parsePageResponse = <T = unknown, C = Record<string, string>>({
  page,
  total_pages,
  total_results,
  results,
  ...common
}: TmdbApiResponsePageData<T, C>): TmdbPaginatedData => {
  const response: TmdbPaginatedData = { data: results, pagination: { page, total_pages, total_results } };
  if (Object.keys(common).length) response.common = common;
  return response;
};

export const parseResponse = (response: TmdbApiResponseData | TmdbApiResponsePageData) => {
  if ('success' in response && !response.success) throw response;

  let _result: Record<string, unknown> = { ...response };

  delete _result.status_code;
  delete _result.status_message;
  delete _result.success;

  if (isPageResponse(response)) _result = parsePageResponse(response);
  if ('results' in _result && Object.keys(_result).length === 1) return _result.results;

  return _result;
};

const patchTmdbResponse = <T extends Response>(response: T): T => patchResponse(response, parseResponse);

/**
 * Represents a Tmdb API client with common functionality.
 *
 * @class BaseTmdbClient
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging  -- To allow type extension
export class BaseTmdbClient extends BaseClient<TmdbApiQuery, TmdbApiResponse, TmdbClientSettings, TmdbClientAuthentication> implements TmdbApi {
  /**
   * Creates an instance of BaseTmdbClient.
   * @param options - The options for the client.
   * @param authentication - The authentication for the client.
   * @param api - The API endpoints for the client.
   */
  constructor(options: TmdbClientOptions, authentication: TmdbClientAuthentication = {}, api: ITmdbApi = {}) {
    super(options, authentication, api);
  }

  /**
   * Parses the template to construct the headers for a Tmdb API request.
   *
   * @protected
   *
   * @template T - The type of the parameters.
   **
   * @returns {HeadersInit} The parsed request headers.
   *
   * @throws {Error} Throws an error if auth is required and the access token is missing.
   */
  protected _parseHeaders<T extends TmdbApiParam = TmdbApiParam>(template: TmdbApiTemplate<T>): HeadersInit {
    const headers: HeadersInit = {
      [BaseApiHeaders.UserAgent]: this.settings.useragent,
      [BaseApiHeaders.Accept]: BaseHeaderContentType.Json,
      [BaseApiHeaders.ContentType]: BaseHeaderContentType.Json,
    };

    if (template.opts?.auth && this.auth.accessToken) {
      if (this.auth.expiresAt === undefined || Date.parse(this.auth.expiresAt) > Date.now()) {
        headers[BaseApiHeaders.Authorization] = `Bearer ${this.auth.accessToken}`;
      } else {
        throw Error('User auth required: access_token has expired');
      }
    } else if (template.opts?.auth === 'token' && !this.auth.accessToken) {
      throw Error('User auth required: access_token is missing');
    } else if (template.opts?.auth === 'session' && !this.auth.sessionId) {
      throw Error('User auth required: session_id is missing');
    } else if (template.opts?.auth && !this.auth.accessToken && !this.auth.sessionId) {
      throw Error('User auth required: session_id or access_token is missing');
    } else if (this.settings.readToken) {
      headers[BaseApiHeaders.Authorization] = `Bearer ${this.settings.readToken}`;
    }

    return headers;
  }

  /**
   * Parses the parameters and constructs the URL for a Tmdb API request.
   *
   * @protected
   *
   * @template T - The type of the parameters.
   *
   * @param template - The template for the API endpoint.
   * @param {T} params - The parameters for the API call.
   *
   * @returns {string} The URL for the Tmdb API request.
   *
   * @throws {Error} Throws an error if mandatory parameters are missing or if a filter is not supported.
   */
  protected _parseUrl<T extends TmdbApiParam = TmdbApiParam>(template: TmdbApiTemplate<T>, params: T): URL {
    const versionedTemplate = injectUrlPrefix(`/${template.opts.version}`, template);
    const _template = injectCorsProxyPrefix(versionedTemplate, this.settings);
    const _url = parseUrl<T>(_template, params, this.settings.endpoint);
    if (this.auth.sessionId) _url.searchParams.set('session_id', this.auth.sessionId);
    if (this.settings.apiKey && !this.auth.accessToken && !this.settings.readToken) {
      _url.searchParams.set('api_key', this.settings.apiKey);
    }
    return _url;
  }

  /**
   * Parses the response from the API before returning from the call.
   * @param response - The response from the API.
   *
   * @returns {TmdbApiResponse} The parsed response.
   * @protected
   */
  // eslint-disable-next-line class-methods-use-this -- implemented from abstract class
  protected _parseResponse(response: TmdbApiResponse<TmdbApiResponseData | TmdbApiResponsePageData>): TmdbApiResponse {
    if (!response.ok || response.status >= 400) throw response;

    const parsed: TmdbApiResponse = patchTmdbResponse(response);
    const _clone = parsed.clone;
    parsed.clone = () => patchTmdbResponse(_clone.bind(parsed)());
    return parsed;
  }
}
