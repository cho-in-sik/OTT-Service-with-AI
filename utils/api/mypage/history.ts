import { Movie } from '@/types/movie';
import { api } from '../customAxios';

const q = (query: string, value: string | number | undefined) =>
  value !== undefined ? `${query}=${value}` : '';

export const getHistory = async (lastId?: number, count?: number) => {
  const { data } = await api.get<{
    data: Movie[];
    meta: { count: number; hasMore: boolean };
  }>(`/api/movies/histories?${q('after', lastId)}&${q('count', count)}`);

  return data;
};
export const deleteHistory = (movieId: number) =>
  api.delete(`/api/movies/${movieId}/history`);
