'use client';

import { usePathname, useRouter } from 'next/navigation';
import { getMovieReviews } from '@/utils/api/movie/getMovieReviews';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import profileBasicImg from '@/public/basicImg.jpeg';
import Image from 'next/image';
import { IMovieReview } from '@/types/review';
import { api } from '@/utils/api/customAxios';
import { getDateBefore } from '@/utils/review/getDateBefore';

export default function MovieReviews() {
  const pathname = usePathname();

  const url = Number(pathname?.slice(15));

  const { data } = useQuery(['movieReviews'], () => getMovieReviews(url), {
    suspense: true,
    staleTime: 600000,
  });

  console.log(data.data);

  // 평균 평정 배열
  let averageRating: Array<any> = [0];
  const dataRating = data?.data.map((item: IMovieReview) =>
    averageRating.push(item.rating),
  );
  const averRating = averageRating.reduce((prev: number, cur: number) => {
    return prev + cur;
  });

  //리뷰삭제
  const handleReviewDelete = async (reviewId: number) => {
    const res = await api.delete(`/api/movies/reviews/${reviewId}`);
    console.log(res);

    alert('리뷰 삭제 성공');
  };

  return (
    <div className="flex">
      <div className="px-14 py-10 w-10/12 mx-auto my-16 border-solid border border-gray-800/10 rounded-2xl shadow-2xl bg-white">
        <div className="mb-8 font-bold text-3xl">{`${data.data[0].movieTitle} Reviews`}</div>
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
              <div className="stat-value">
                {(averRating / data.data.length).toFixed(2)}
              </div>
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
                      {item.author.avatarUrl === null && (
                        <Image src={profileBasicImg} alt="profilebasicimage" />
                      )}
                      <img
                        src={`http://localhost:8080${item.author.avatarUrl}`}
                      />
                    </div>
                    <div>
                      <div>{item.author.name}</div>
                    </div>
                  </td>
                  <td>{item.title}</td>

                  <td className="max-w-xs truncate overflow-hidden overflow-ellipsis underline underline-offset-4 ">
                    <label htmlFor={`modal-${item.id}`}>{item.content}</label>

                    <input
                      type="checkbox"
                      id={`modal-${item.id}`}
                      className="modal-toggle"
                    />
                    <label
                      htmlFor={`modal-${item.id}`}
                      className="modal cursor-pointer"
                    >
                      <label className="modal-box relative">
                        <h3 className="text-lg font-bold">Detail</h3>
                        <p className="py-4 whitespace-normal overflow-hidden overflow-ellipsis">
                          {item.content}
                        </p>
                      </label>
                    </label>
                  </td>

                  <td>{item.rating}</td>
                  <td className="text-slate-500">
                    {getDateBefore(item.createdAt)}
                  </td>
                  <td>
                    <button
                      className="btn btn-square btn-outline btn-error"
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
