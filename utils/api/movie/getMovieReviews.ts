import { IMovieReview } from '@/types/review';
import { api } from '../customAxios';
import { PaginationResult } from '@/types/paginationResult';

export async function getMovieReviews(movieNum: number) {
  const { data } = await api.get<PaginationResult<IMovieReview>>(
    `/api/movies/${movieNum}/reviews`,
  );
  return data;
}
