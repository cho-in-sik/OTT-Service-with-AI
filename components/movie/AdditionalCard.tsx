'use client';

import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getLocalmovieList } from '@/utils/api/home/getMovieList';
import { useSearchParams } from 'next/navigation';
import { Genre, Movie } from '@/types/movie';
import Card from './Card';

interface Props {
  lastId: number;
}

const AdditionalCard = ({ lastId }: Props) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const genre = useSearchParams()?.get('genre');

  const { data, fetchNextPage } = useInfiniteQuery(
    ['movies', genre],
    async ({ pageParam = lastId }) => {
      let totalData: {
        data: Movie[];
        meta: { count: number; hasMore: boolean };
      };
      if (genre) {
        totalData = await getLocalmovieList({
          after: pageParam,
          cache: 'cache-force',
          genre: genre as Genre,
        });
      } else {
        totalData = await getLocalmovieList({
          after: pageParam,
          cache: 'cache-force',
        });
      }
      return totalData;
    },
    {
      getNextPageParam: (lastPage, Allpages) => {
        if (lastPage.meta.hasMore)
          return lastPage.data[lastPage.data.length - 1].id;
      },
    },
  );

  useEffect(() => {
    fetchNextPage();
  }, [inView]);

  return (
    <>
      {data?.pages.map(({ data }) => {
        return data.map(({ id, title, genres, posterUrl }: any) => (
          <Card
            key={id}
            id={id}
            title={title}
            genres={genres}
            posterUrl={posterUrl}
          />
        ));
      })}
      <div className="text-xl text-white" ref={ref}>
        이게 보이면 추가 load 할거임
      </div>
    </>
  );
};

export default AdditionalCard;
