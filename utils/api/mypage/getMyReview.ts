import { api } from '../customAxios';

export async function getMyReview() {
  const res = await api

    .get('/api/users/me/movies/reviews')
    .then((res) => res.data);

  return res;
}
