import { api } from '../customAxios';

export async function getMovieReviews() {
  const { data } = await api.get('/api/movies/11/reviews');
  return data;
}
