'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getMovieReviews } from '@/utils/api/movie/getMovieReviews';
import {
  useQuery,
  useInfiniteQuery,
  QueryClient,
  useMutation,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import profileBasicImg from '@/public/basicImg.jpeg';
import Image from 'next/image';
import { IMovieReview } from '@/types/review';
import { api } from '@/utils/api/customAxios';
import { getTimeDiff } from '@/utils/review/getTimeDiff';

import { AxiosError } from 'axios';

export default function MovieReviews() {
  const pathname = usePathname();
  const url = Number(pathname?.slice(15));

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // const queryClient = new QueryClient();

  const {
    data: paginationResult,
    fetchNextPage,
    isFetched,
    dataUpdatedAt,
  } = useInfiniteQuery(
    ['movie-reviews', url],
    ({ pageParam }) => {
      // const movieReviews = queryClient.getQueryState<
      //   PaginationResult<IMovieReview>
      // >(['movie-reviews', url]);
      // console.log('here');
      // console.log(movieReviews?.data?.data[]);
      const after: number | null = pageParam;
      return getMovieReviews(url, after);
    },
    {
      // initialData: () => newInitReviewsPaginationResult(),
      // initialDataUpdatedAt: () => 0,
      suspense: true,
      staleTime: 60000,

      getNextPageParam: ({ data, meta }) => {
        if (meta.hasMore) {
          return meta.lastId;
        }
        //hasmore false일 경우 더이상 안부르기
        // if (lastPage.meta.hasMore)
        //   return lastPage.data[lastPage.data.length - 1].id;
      },
    },
  );
  console.log(paginationResult);

  //끝에 도달시 다음 페이지 불러오는 함수
  useEffect(() => {
    console.log('okokok');
    console.log(dataUpdatedAt);
    fetchNextPage();
  }, [inView]);

  const [sortedReviews, setSortedReviews] = useState<IMovieReview[]>([]);
  // const { data: paginationResult, isFetched } = useQuery(
  //   ['movieReviews'],
  //   () => getMovieReviews(url),
  //   {
  //     initialData: newInitPaginationResult(),
  //     initialDataUpdatedAt: () => 0,
  //     suspense: true,
  //     staleTime: 600000,
  //   },
  // );

  useEffect(() => {
    if (paginationResult && paginationResult.pages.length > 0) {
      setSortedReviews(
        Array.from(
          new Set([
            ...sortedReviews,
            ...paginationResult.pages[paginationResult.pages.length - 1].data,
          ]),
        ),
      );
    }
  }, [isFetched, dataUpdatedAt]);

  const sortData = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    let sortedReviewsTemp: IMovieReview[] = [];

    if (value === 'new') {
      sortedReviewsTemp = sortedReviews.sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
      );
    } else if (value === 'old') {
      sortedReviewsTemp = sortedReviews.sort(
        (a, b) =>
          new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(),
      );
    } else if (value === 'highRating') {
      sortedReviewsTemp = sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (value === 'lowRating') {
      sortedReviewsTemp = sortedReviews.sort((a, b) => a.rating - b.rating);
    }

    setSortedReviews([...sortedReviewsTemp]);
  };

  // 평균 평정 배열
  let averageRating: Array<any> = [0];
  const dataRating = sortedReviews.map((item: IMovieReview) =>
    averageRating.push(item.rating),
  );
  const averRating = averageRating.reduce((prev: number, cur: number) => {
    return prev + cur;
  });

  //리뷰삭제
  const handleReviewDelete = async (reviewId: number) => {
    try {
      const res = await api.delete(`/api/movies/reviews/${reviewId}`);
      console.log(res);
      setSortedReviews((prevReviews) =>
        prevReviews.filter(({ id }) => id !== reviewId),
      );
      alert('리뷰 삭제 성공');
    } catch (error) {
      const e = error as AxiosError;
      if (e.response?.status === 403) {
        alert((e.response.data as { message: string }).message);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="px-14 py-10 w-10/12 mx-auto my-16 border-solid border border-gray-800/10 rounded-2xl shadow-2xl bg-white">
          {/* <div className="mb-8 font-bold text-3xl">{`${sortedReviews.movieTitle} Reviews`}</div> */}

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
                <div className="stat-value">{sortedReviews.length}</div>
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
                  {(averRating / sortedReviews.length).toFixed(2)}
                </div>
              </div>
            </div>

            <select
              onChange={sortData}
              className="select select-bordered select-sm  max-w-xs block mb-4"
            >
              <option value="new">최신순</option>
              <option value="old">오래된 순</option>
              <option value="highRating">평점 높은 순</option>
              <option value="lowRating">평점 낮은 순</option>
            </select>

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
                {sortedReviews.map((item: IMovieReview, i: number) => (
                  <tr key={item.id}>
                    <th>{i + 1}</th>
                    <td className="flex items-center space-x-3">
                      <div className="mask mask-squircle w-12 h-12 ">
                        {item.author.avatarUrl === null && (
                          <Image
                            src={profileBasicImg}
                            alt="profilebasicimage"
                          />
                        )}
                        <img
                          src={`http://kdt-ai6-team05.elicecoding.com${item.author.avatarUrl}`}
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

                    <td>{Math.floor(item.rating)}</td>
                    <td className="text-slate-500">
                      {getTimeDiff(item.createdAt)}
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
      <div className="text-zinc-50 " ref={ref}>
        more load more load loading...
      </div>
    </>
  );
}
