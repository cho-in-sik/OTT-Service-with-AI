'use client';

import { api } from '@/util/customAxios';
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
  const router = useRouter();

  async function logout() {
    await api.post('/api/auth/logout');
    alert('로그아웃되었습니다.');
    router.refresh();
  }

  return <button onClick={logout}>로그아웃</button>;
}
