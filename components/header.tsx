import Link from 'next/link';
import { LoginBtn, LogoutBtn } from './auth/SignBtn';
import { cookies } from 'next/headers';

export default function Header() {
  const cookie = cookies().get('ACCESS_TOKEN');

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
                <Link href="/movie">ALL</Link>
                <Link href="/movie?genre=Action">Action</Link>
                <Link href="/movie?genre=Adventure">Adventure</Link>
                <Link href="/movie?genre=Animation">Animation</Link>
                <Link href="/movie?genre=Comedy">Comedy</Link>
                <Link href="/movie?genre=Crime">Crime</Link>
                <Link href="/movie?genre=Documentary">Documentary</Link>
                <Link href="/movie?genre=Drama">Drama</Link>
                <Link href="/movie?genre=Family">Family</Link>
                <Link href="/movie?genre=Fantasy">Fantasy</Link>
                <Link href="/movie?genre=History">History</Link>
                <Link href="/movie?genre=Music">Music</Link>
                <Link href="/movie?genre=Mystery">Mystery</Link>
                <Link href="/movie?genre=Romance">Romance</Link>
                <Link href="/movie?genre=Science Fiction">Science Fiction</Link>
                <Link href="/movie?genre=Thriller">Thriller</Link>
                <Link href="/movie?genre=TV Movie">TV Movie</Link>
                <Link href="/movie?genre=War">War</Link>
                <Link href="/movie?genre=Western">Western</Link>
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
              {!!cookie && (
                <>
                  <li>
                    <Link href="mypage/myinfo">회원 정보 수정</Link>
                  </li>
                  <li>
                    <Link href="mypage/mymovie">내가 쓴 리뷰</Link>
                  </li>{' '}
                  <li>
                    <LogoutBtn />
                  </li>
                </>
              )}
              {!cookie && (
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
