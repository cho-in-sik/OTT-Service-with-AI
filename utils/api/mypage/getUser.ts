import { api } from '../customAxios';

export async function getUser() {
  const res = await api
    // .get('http://localhost:8000/api/users/me', {
    .get('/api/users/me')
    .then((res) => res.data);

  return res;
}
