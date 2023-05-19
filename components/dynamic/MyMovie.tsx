'use client';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';

import { getMyReview } from '@/utils/api/mypage/getMyReview';
import { api } from '@/utils/api/customAxios';
import profileBasicImg from '@/public/basicImg.jpeg';
import noReviewHeroImg from '@/public/hero.jpeg';
import { useRouter } from 'next/navigation';
import { IMovieReview } from '@/types/review';
import { useState } from 'react';

export default function MyMovie() {
  const { data, refetch } = useQuery(['myreviews'], getMyReview, {
    suspense: true,
    staleTime: 6000,
  });

  const [sortedReviews, setSortedReviews] = useState<IMovieReview[]>([
    data.data,
  ]);

  const router = useRouter();

  // 평균 평정 배열
  let averageRating: Array<any> = [0];
  const dataRating = data.data.map((item: IMovieReview) =>
    averageRating.push(item.rating),
  );
  const averRating = averageRating.reduce((prev: number, cur: number) => {
    return prev + cur;
  });

  const handleReviewDelete = async (reviewId: number) => {
    await api.delete(`/api/movies/reviews/${reviewId}`);

    setSortedReviews((prevReviews) =>
      prevReviews.filter(({ id }) => id !== reviewId),
    );
    console.log(sortedReviews);
    refetch();
    alert('리뷰 삭제 성공');
  };

  return (
    <div className="flex">
      <div className="w-10/12 py-10 mx-auto my-16 bg-white border border-solid shadow-2xl px-14 border-gray-800/10 rounded-2xl">
        {data.data.length === 0 ? (
          <div className="min-h-screen hero bg-base-200 rounded-2xl">
            <div className="flex-col hero-content lg:flex-row">
              <Image
                src={noReviewHeroImg}
                className="max-w-sm mr-4 rounded-lg shadow-2xl"
                alt="heroImage"
              />

              <div>
                <h1 className="text-5xl font-bold">NO REVIEW HERE!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => router.push('/')}
                >
                  Go to Review
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 text-2xl font-bold">My Reviews</div>
            <div className="w-5/6 mb-10 ml-16 shadow stats">
              <div className="stat ">
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

                <div className="stat-value text-primary">
                  {data?.data.length}
                </div>
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
                  {(averRating / data.data.length).toFixed(2)}
                </div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      {data.data[0].author.avatarUrl ? (
                        <img
                          src={`http://kdt-ai6-team05.elicecoding.com${data.data[0].author.avatarUrl}`}
                        />
                      ) : (
                        <Image
                          className="h-[600px]"
                          src={profileBasicImg}
                          alt="기본이미지"
                          width={100}
                          height={100}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-5 stat-value">
                  {data.data[0].author.name}님
                </div>

                {/* <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div> */}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full table-zebra">
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
                  {data.data.map((item: IMovieReview, i: number) => (
                    <tr key={item.id}>
                      <th>{i + 1}</th>
                      <th className="overflow-hidden whitespace-normal overflow-ellipsis">
                        {item.title}
                      </th>
                      <td className="overflow-hidden whitespace-normal overflow-ellipsis">
                        {item.overview}
                      </td>
                      <td>{item.rating}</td>
                      <td>
                        <button
                          className="bg-red-400 border-none btn"
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
          </>
        )}
      </div>
    </div>
  );
}
