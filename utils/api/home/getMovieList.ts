import { api } from '../customAxios';
import axios from 'axios';
import { Movie, Genre, Criteria } from '@/types/movie';
import { Cache } from '@/types/common';

const q = (query: string, value: string | number | undefined) =>
  value !== undefined ? `${query}=${value}` : '';

export const getTMDBMovieList = async (
  path: 'now_playing' | 'upcoming',
  cache: Cache,
) => {
  const { data } = await axios.get(
    `${process.env.TMDB_API_BASE_URL}/${path}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
    { headers: { 'cache-control': cache } },
  );
  return data;
};

export const getLocalmovieList = async ({
  after,
  count,
  order,
  criteria,
  genre,
  cache = 'cache-force',
}: {
  after?: number;
  count?: number;
  order?: 'desc' | 'asc';
  criteria?: Criteria;
  genre?: Genre;
  cache: Cache;
}) => {
  const { data } = await api.get<{
    data: Movie[];
    meta: { count: number; hasMore: boolean };
  }>(
    `/api/movies?${q('after', after)}${q('&count', count)}${q(
      '&order',
      order,
    )}${q('&criteria', criteria)}${q('&genre', genre)}`,
    {
      headers: {
        'cache-control': cache,
      },
    },
  );
  return data;
};

export const getMovieHistory = async ({
  after,
  count,
  cache,
}: {
  after?: number;
  count?: number;
  cache: Cache;
}) => {
  const { data } = await api.get<Movie[]>(
    `api/users/me/movies/history${q('after', after)}${q('count', count)}`,
    {
      headers: {
        'cache-control': cache,
      },
    },
  );
  return data;
};

export const getFavoriteMovies = async ({
  after,
  count,
  cache,
}: {
  after?: number;
  count?: number;
  cache: Cache;
}) => {
  const { data } = await api.get<Movie[]>(
    `api/users/me/movies/favorite${q('after', after)}${q('count', count)}`,
    {
      headers: {
        'cache-control': cache,
      },
    },
  );
  return data;
};

export const getLikeMovieList = async ({
  after,
  count,
  cache,
}: {
  after?: number;
  count?: number;
  cache: Cache;
}) => {
  const { data } = await api.get<{
    data: Movie[];
    meta: { count: number; hasMore: boolean };
  }>(`/api/movies/likes?${q('after', after)}${q('count', count)}`, {
    headers: {
      'cache-control': cache,
    },
  });

  return data;
};
