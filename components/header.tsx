'use client';

import Link from 'next/link';
import { LoginBtn, LogoutBtn } from './auth/SignBtn';
// import { cookies } from 'next/headers';
import { getUser } from '@/utils/api/mypage/getUser';
import { useQuery } from '@tanstack/react-query';
import profileBasicImg from '@/public/basicImg.jpeg';
import Image from 'next/image';

async function _getUser() {
  // if (sessionStorage.getItem('isLoggedIn') !== 'true'){
  //   return null;
  // }
  try {
    const user = await getUser();
    return user;
  } catch (err) {
    const e = err as Error;

    return null;
  }
}

export default function Header() {
  // const cookie = cookies().get('ACCESS_TOKEN');

  const { data: user } = useQuery(['myInfo'], _getUser, {
    suspense: true,
    retry: 0,
    // useErrorBoundary: true,
  });
  console.log(user);

  return (
    <>
      <div className="fixed z-[11] text-white duration-200 bg-transparent navbar hover:bg-black hover:text-cyan-500">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 bg-black shadow menu menu-compact dropdown-content rounded-box w-52"
            >
              <li>
                <Link className="hover:underline" href="/movie">
                  ALL
                </Link>
                {[
                  'Action',
                  'Adventure',
                  'Animation',
                  'Comedy',
                  'Crime',
                  'Documentary',
                  'Drama',
                  'Family',
                  'Fantasy',
                  'History',
                  'Music',
                  'Mystery',
                  'Romance',
                  'Science Fiction',
                  'Thriller',
                  'TV Movie',
                  'War',
                  'Western',
                ].map((genre) => (
                  <Link
                    key={genre}
                    className="hover:underline"
                    href={`/movie?genre=${genre.replace(' ', '%20')}`}
                  >
                    {genre}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" className="text-xl normal-case btn btn-ghost">
            오짬🦑🍜
          </Link>
        </div>
        <div className="navbar-end">
          {user === null ? (
            <div></div>
          ) : user.avatarUrl ? (
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={`http://kdt-ai6-team05.elicecoding.com${user.avatarUrl}`}
                  alt="profileImage"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          ) : (
            <div className="avatar">
              <div className="w-12 rounded-full">
                <Image
                  src={profileBasicImg}
                  alt="기본이미지"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          )}
          {user === null ? (
            <div></div>
          ) : (
            <span className="ml-2 mr-2 font-medium text-lg">{user.name}</span>
          )}

          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={1} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </label>
            <ul
              tabIndex={1}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              {!!user && (
                <>
                  <li>
                    <Link href="mypage/myinfo">회원 정보 수정</Link>
                  </li>
                  <li>
                    <Link href="mypage/likemovie">좋아요한 영화</Link>
                  </li>
                  <li>
                    <Link href="mypage/mymovie">내가 쓴 리뷰</Link>
                  </li>
                  <li>
                    <Link href="mypage/history">최근 본 영화</Link>
                  </li>
                  <li>
                    <LogoutBtn />
                  </li>
                </>
              )}
              {!user && (
                <>
                  <li>
                    <Link href="/auth/sign-up">회원가입</Link>
                  </li>
                  <li>
                    {/* <Link href="/auth/sign-in">로그인</Link> */}
                    <LoginBtn />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
