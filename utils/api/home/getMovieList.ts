import { api } from '../customAxios';
import axios, { AxiosResponse } from 'axios';
import { Movie, Genre, Criteria } from '@/types/movie';
import { Cache } from '@/types/common';

const q = (query: string, value: string | number | undefined) =>
  query ? `?${query}=${value}` : '';

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
  skip,
  take,
  order,
  criteria,
  genre,
  cache = 'cache-force',
}: {
  skip?: number;
  take?: number;
  order?: 'desc' | 'asc';
  criteria?: Criteria;
  genre?: Genre;
  cache: Cache;
}) => {
  const { data } = await api.get<Movie[]>(
    `/api/movies${q('skip', skip)}${q('take', take)}${q('order', order)}${q(
      'criteria',
      criteria,
    )}${q('genre', genre)}`,
    {
      headers: {
        'cache-control': cache,
      },
    },
  );
  return data;
};

export const getMovieHistory = async ({
  skip,
  take,
  cache,
}: {
  skip?: number;
  take?: number;
  cache: Cache;
}) => {
  const { data } = await api.get<Movie[]>(
    `api/users/me/movies/history${q('skip', skip)}${q('take', take)}`,
    {
      headers: {
        'cache-control': cache,
      },
    },
  );
  return data;
};

export const getFavoriteMovies = async ({
  skip,
  take,
  cache,
}: {
  skip?: number;
  take?: number;
  cache: Cache;
}) => {
  const { data } = await api.get<Movie[]>(
    `api/users/me/movies/favorite${q('skip', skip)}${q('take', take)}`,
    {
      headers: {
        'cache-control': cache,
      },
    },
  );
  return data;
};
