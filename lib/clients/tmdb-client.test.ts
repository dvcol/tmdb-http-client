import { BaseApiHeaders, BaseHeaderContentType } from '@dvcol/base-http-client';
import { hasOwnProperty } from '@dvcol/base-http-client/utils/test';
import { HttpMethod } from '@dvcol/common-utils/http';
import { CancellableFetch } from '@dvcol/common-utils/http/fetch';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Config } from '../config';

import { TmdbClient } from './tmdb-client';

import type { TmdbApiResponseData, TmdbClientAuthentication } from '~/models/tmdb-client.model';

import { minimalTmdbApi } from '~/api/tmdb-api-minimal.endpoints';
import { tmdbApi } from '~/api/tmdb-api.endpoints';
import { tmdbClientSettings } from '~/mocks/tmdb-settings.mock';

describe('tmdb-client.ts', () => {
  const tmdbClient = new TmdbClient(tmdbClientSettings, {}, tmdbApi);

  const data = { results: 'result', value: 'value', nested: { key: 'value' } };

  const mockResponse: TmdbApiResponseData<typeof data> = {
    success: true,
    status_code: 200,
    status_message: 'OK',
    ...data,
  };

  const fetch = vi.spyOn(CancellableFetch, 'fetch');

  const mockAuth: TmdbClientAuthentication = {
    accessToken: 'access_token',
    sessionId: 'session_id',
    isGuest: false,
  };

  const payload = {
    headers: {
      [BaseApiHeaders.Authorization]: `Bearer ${tmdbClientSettings.readToken}`,
      [BaseApiHeaders.UserAgent]: tmdbClientSettings.useragent,
      [BaseApiHeaders.ContentType]: BaseHeaderContentType.Json,
      [BaseApiHeaders.Accept]: BaseHeaderContentType.Json,
    },
    method: HttpMethod.GET,
  };

  const mockNow = 100;

  beforeEach(async () => {
    fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse)));
    vi.spyOn(Date, 'now').mockReturnValue(mockNow);
    tmdbClient.importAuthentication(mockAuth);
  });

  afterEach(async () => {
    tmdbClient.importAuthentication({});
    await tmdbClient.clearCache();

    vi.clearAllMocks();
  });

  describe('tmdbClient', () => {
    it('should have every endpoint', () => {
      expect.hasAssertions();

      hasOwnProperty(tmdbApi, tmdbClient);
    });

    it('should have only minimal endpoint', () => {
      expect.hasAssertions();

      const minimalClient = new TmdbClient(tmdbClientSettings, {});
      hasOwnProperty(minimalTmdbApi, minimalClient);
    });

    it('should query popular movies endpoint', async () => {
      expect.assertions(1);

      const res = await tmdbClient.v3.movies.popular();

      await expect(res.json()).resolves.toStrictEqual(data);
    });

    it('should query popular movies endpoint with params', async () => {
      expect.assertions(1);

      await tmdbClient.v3.movies.popular({ page: 1 });

      expect(fetch).toHaveBeenCalledWith(new URL('/3/movie/popular?page=1&session_id=session_id', tmdbClientSettings.endpoint).toString(), payload);
    });

    it('should query cached popular movies endpoint', async () => {
      expect.assertions(2);

      await tmdbClient.v3.movies.popular.cached();
      await tmdbClient.v3.movies.popular.cached();
      await tmdbClient.v3.movies.popular.cached();

      expect(fetch).toHaveBeenCalledWith(new URL('/3/movie/popular?session_id=session_id', tmdbClientSettings.endpoint).toString(), payload);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should request user token', async () => {
      expect.assertions(2);

      fetch.mockResolvedValue(new Response(JSON.stringify({ request_token: 'request_token' })));

      const res = await tmdbClient.requestUserToken();

      expect(fetch).toHaveBeenCalledWith(new URL('/4/auth/request_token?session_id=session_id', tmdbClientSettings.endpoint).toString(), {
        ...payload,
        method: HttpMethod.POST,
        body: JSON.stringify({}),
      });

      expect(res).toMatchObject({
        request_token: 'request_token',
        expires: mockNow + tmdbClientSettings.requestTokenTTL,
        redirect_approve: `${Config.requestTokenUrl}request_token`,
      });
    });

    it('should request user token with redirect', async () => {
      expect.assertions(2);

      fetch.mockResolvedValue(new Response(JSON.stringify({ request_token: 'request_token' })));

      const res = await tmdbClient.requestUserToken('redirect_to');

      expect(fetch).toHaveBeenCalledWith(new URL('/4/auth/request_token?session_id=session_id', tmdbClientSettings.endpoint).toString(), {
        ...payload,
        method: HttpMethod.POST,
        body: JSON.stringify({ redirect_to: 'redirect_to' }),
      });

      expect(res).toMatchObject({
        request_token: 'request_token',
        expires: mockNow + tmdbClientSettings.requestTokenTTL,
        redirect_to: 'redirect_to',
        redirect_approve: `${Config.requestTokenUrl}request_token`,
      });
    });

    it('should login', async () => {
      expect.assertions(2);

      fetch.mockResolvedValue(new Response(JSON.stringify({ access_token: 'access_token' })));

      const res = await tmdbClient.login('request_token');

      expect(fetch).toHaveBeenCalledWith(new URL('/4/auth/access_token?session_id=session_id', tmdbClientSettings.endpoint).toString(), {
        ...payload,
        method: HttpMethod.POST,
        body: JSON.stringify({ request_token: 'request_token' }),
      });

      expect(res).toMatchObject({
        accessToken: 'access_token',
      });
    });

    it('should logout', async () => {
      expect.assertions(2);

      await tmdbClient.logout('access_token');

      expect(fetch).toHaveBeenCalledWith(new URL('/4/auth/access_token?session_id=session_id', tmdbClientSettings.endpoint).toString(), {
        ...payload,
        method: HttpMethod.DELETE,
      });

      expect(tmdbClient.auth).toMatchObject({ accessToken: undefined });
    });
  });
});
