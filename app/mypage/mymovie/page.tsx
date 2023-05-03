'use client';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { getMyReview } from '@/utils/api/mypage/getMyReview';
import { api } from '@/utils/api/customAxios';
import profileBasicImg from '@/public/basicImg.jpeg';
const data = [
  {
    id: 1,
    title: '1리뷰입니다..',
    overview: '맛있어요 이  영화',
    rating: 5,
    createdAt: '2023-04-16T01:41:43.000Z',
    updatedAt: '2023-04-15T16:41:44.000Z',
    author: {
      id: 3,
      name: 'abc',
      avatarUrl: '/imgs/avatar/apassa21.png',
    },
  },
  {
    id: 2,
    title: '2리뷰입니다..',
    overview: '맛없어요 영화',
    rating: 2,
    createdAt: '2023-04-16T01:41:43.000Z',
    updatedAt: '2023-04-15T16:41:44.000Z',
    author: {
      id: 3,
      name: 'abc',
      avatarUrl: '/imgs/avatar/apassa21.png',
    },
  },
  {
    id: 3,
    title: '3리뷰입니다..',
    overview: '시즌 2가 기다려지는 영화',
    rating: 4,
    createdAt: '2023-04-16T01:41:43.000Z',
    updatedAt: '2023-04-15T16:41:44.000Z',
    author: {
      id: 3,
      name: 'abc',
      avatarUrl: '/imgs/avatar/apassa21.png',
    },
  },
  {
    id: 4,
    title: '4리뷰입니다..',
    overview: '역시 놀란! 놀랏습니다 ',
    rating: 4,
    createdAt: '2023-04-16T01:41:43.000Z',
    updatedAt: '2023-04-15T16:41:44.000Z',
    author: {
      id: 3,
      name: 'abc',
      avatarUrl: '/imgs/avatar/apassa21.png',
    },
  },
];

interface IReviewData {
  id: number;
  title: string;
  overview: string;
  rating: number;
}

export default function MyMovie() {
  // const { data } = useQuery(['myreviews'], getMyReview, {
  //   onSuccess:console.log("성공")
  // });

  const handleReviewDelete = async (reviewId: number) => {
    await api.delete(`/api/movies/reviews/${reviewId}`);
  };

  return (
    <div className="flex">
      <div className="px-14 py-10 w-10/12 mx-auto my-16 border-solid border border-gray-800/10 rounded-2xl shadow-2xl ">
        <div className="font-bold text-2xl mb-4">My Reviews</div>
        <div className="stats shadow mb-10">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Reviews</div>

            <div className="stat-value text-primary">{data.length}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Average Rating</div>

            <div className="stat-value text-secondary">
              {data.map((item: IReviewData) => item.rating)}
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <Image
                    className="h-[600px]"
                    src={profileBasicImg}
                    alt="기본이미지"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className="stat-value">{data[0].author.name}님</div>

            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>제목</th>
                <th>내용</th>
                <th>평점</th>
                <th>리뷰 삭제</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: IReviewData, i) => (
                <tr key={item.id}>
                  <th>{i + 1}</th>
                  <th>{item.title}</th>
                  <td>{item.overview}</td>
                  <td>{item.rating}</td>
                  <td>
                    <button
                      className="btn bg-red-400 border-none"
                      onClick={() => handleReviewDelete(item.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
