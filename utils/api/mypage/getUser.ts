import { api } from '../customAxios';
import { User } from '../../../types/user';
import axios from 'axios';

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export async function getUser() {
  await sleep(2000);
  const { data: user } = await axios.get<User>(
    'http://localhost:8000/api/users/me',
  );
  // .get('http://localhost:8000/api/users/me', {
  // .get('/api/users/me')

  return user;
}
