import { api } from '../customAxios';

export async function getMovieReviews(movieNum: number) {
  const { data } = await api.get(`/api/movies/${movieNum}/reviews`);
  return data;
}
