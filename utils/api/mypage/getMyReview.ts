import { api } from '../customAxios';

export async function getMyReview() {
  const res = await api.get('/api/users/me/reviews');

  return res.data;
}
