'use client';

import { getMovieReviews } from '@/utils/api/movie/getMovieReviews';
import { useQuery } from '@tanstack/react-query';
import profileBasicImg from '@/public/basicImg.jpeg';
import Image from 'next/image';
import { IMovieReview } from '@/types/review';
import { api } from '@/utils/api/customAxios';

export default function MovieReviews() {
  const { data } = useQuery(['movieReviews'], getMovieReviews, {
    staleTime: 600000,
    suspense: true,
  });

  //리뷰삭제
  const handleReviewDelete = async (reviewId: number) => {
    await api.delete(`/api/movies/reviews/${reviewId}`);
    alert('리뷰 삭제 성공');
  };

  function getDateBefore(index: string) {
    //지금
    const nowDate = new Date().toString();
    const madeDate = new Date(index).toUTCString();

    //madeDate 와 nowDate 차이
    const betweenTime = Math.floor(
      (Date.parse(nowDate) - (Date.parse(madeDate) - 32399000)) / 1000 / 60,
    );

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);

    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }
  }

  return (
    <div className="flex">
      <div className="px-14 py-10 w-10/12 mx-auto my-16 border-solid border border-gray-800/10 rounded-2xl shadow-2xl bg-white">
        <div className="overflow-x-auto w-full">
          <div className="stats shadow mb-8">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Reviews</div>
              <div className="stat-value">{data.data.length}</div>
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Average Rating</div>
              <div className="stat-value">4,200</div>
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">New Registers</div>
              <div className="stat-value">1,200</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>

          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Writer</th>
                <th>Title</th>
                <th>Content</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item: IMovieReview, i: number) => (
                <tr key={item.id}>
                  <th>{i + 1}</th>
                  <td className="flex items-center space-x-3">
                    <div className="mask mask-squircle w-12 h-12 ">
                      <Image src={profileBasicImg} alt="profilebasicimage" />
                    </div>
                    <div>
                      <div>{item.author.name}</div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td className="overflow-hidden truncate">{item.content}</td>
                  <td>{item.rating}</td>
                  <td>{getDateBefore(item.createdAt)}</td>
                  <td>
                    <button
                      className="btn btn-square"
                      onClick={() => handleReviewDelete(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
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
