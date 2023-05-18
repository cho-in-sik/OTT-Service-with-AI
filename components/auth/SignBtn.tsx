'use client';

import { api } from '@/utils/api/customAxios';
import { useRouter } from 'next/navigation';

export function LoginBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('/auth/sign-in');
      }}
    >
      로그인
    </button>
  );
}

export function LogoutBtn() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await api.post('/api/auth/logout');
        // router.push('/');
        window.location.href = '/';
        router.refresh();
      }}
    >
      로그아웃
    </button>
  );
}
