'use client';

import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { deleteHistory } from '@/utils/api/mypage/history';
import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from '@tanstack/react-query';
import { Movie } from '@/types/movie';

interface Props {
  movieId: number;
  title: string;
  backdropUrl: string;
  lastViewedAt: Date;
  overview: string;
  page: number;
}

const Section = ({
  page,
  movieId,
  title,
  backdropUrl,
  lastViewedAt,
  overview,
}: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [src, setSrc] = useState(backdropUrl);

  useMemo(() => {
    dayjs.extend(relativeTime);
  }, []);

  const { mutate, isLoading } = useMutation(() => deleteHistory(movieId), {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['history'] });
      const previousMovies = queryClient.getQueryData(['history']);

      queryClient.setQueryData<
        InfiniteData<{
          data: Movie[];
          meta: { count: number; hasMore: boolean };
        }>
        //@ts-ignore
        // 닥쳐 타입스크립트야, 내가 맞아
      >(['history'], (oldData) => {
        return {
          pages: oldData?.pages.map(({ data, meta }, idx) => {
            if (idx === page) {
              return {
                data: data.filter((movie) => movie.id !== movieId),
                meta: {
                  ...meta,
                  count: meta.count - 1,
                },
              };
            } else {
              return {
                data,
                meta,
              };
            }
          }),
          pageParams: oldData?.pageParams,
        };
      });
    },

    onError: (error, _, rollback) => {
      // rollback()
      console.log(error);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['history']);
    },
  });

  return (
    <div className="flex text-[#fff] my-4 relative">
      <Image
        className="cursor-pointer"
        src={src}
        alt={title}
        width={250}
        height={140}
        onClick={() => router.push(`/movie/${movieId}`)}
        onError={() => {
          setSrc(`${process.env.NEXT_PUBLIC_CLIENT_URL}/default_movie.jpg`);
        }}
        style={{ width: '250px', height: '140px' }}
      />
      <div className="px-5">
        <h2
          className="inline text-2xl font-bold cursor-pointer"
          onClick={() => router.push(`/movie/${movieId}`)}
        >
          {title}
        </h2>
        <button
          className="absolute top-0 right-0 tooltip tooltip-bottom"
          data-tip="시청 기록에서 삭제 "
          onClick={() => {
            mutate();
          }}
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p>{overview}</p>
        <div className="absolute bottom-0">{dayjs(lastViewedAt).fromNow()}</div>
      </div>
    </div>
  );
};

export default Section;
