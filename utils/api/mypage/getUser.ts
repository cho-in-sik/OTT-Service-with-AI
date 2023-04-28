import { api } from '../customAxios';
import axios from 'axios';

export async function getUser() {
  const res = await axios
    // .get('http://localhost:8000/api/users/me', {
    .get('/api/auth/session', {
      withCredentials: true,
    })
    .then((res) => res.data);

  return res;
}
