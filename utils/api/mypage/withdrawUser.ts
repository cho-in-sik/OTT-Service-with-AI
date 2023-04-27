import { api } from '../customAxios';

export async function withdrawUser(password: string) {
  await api.delete(
    '/api/users/me',

    {
      data: { password },
    },
  );
}
