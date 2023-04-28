'use client';

import { api } from '@/utils/api/customAxios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function LoginBtn() {
  return <Link href="/auth/sign-in">로그인</Link>;
}

export function LogoutBtn() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await api.post('/api/auth/logout');
        router.refresh();
      }}
    >
      로그아웃
    </button>
  );
}
