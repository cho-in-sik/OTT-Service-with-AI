'use client';

import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getLocalmovieList } from '@/utils/api/home/getMovieList';
import { useSearchParams } from 'next/navigation';
import { Genre, Movie } from '@/types/movie';
import Card from './Card';
import { useRecoilValue } from 'recoil';
import { isBottom } from '@/atom';
import Spinner from '../common/spinner';

interface Props {
  lastId: number;
  isMounted: boolean;
}

const AdditionalCard = ({ lastId, isMounted }: Props) => {
  const [isMore, setIsMore] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const genre = useSearchParams()?.get('genre');

  const { data, fetchNextPage, status } = useInfiniteQuery(
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
          count: 12,
        });
      } else {
        totalData = await getLocalmovieList({
          after: pageParam,
          cache: 'cache-force',
          count: 12,
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
    // setFetchable(true);
  }, [inView]);

  if (!isMore)
    return (
      <>
        <button
          className="absolute mx-auto bottom-5 btn btn-outline btn-success"
          onClick={() => {
            setIsMore(true);
          }}
        >
          Fetch More?
        </button>
        <div className="mt-20" />
      </>
    );

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
      {status === 'loading' && (
        <div className="text-4xl text-white">loading...</div>
      )}
      <div className="text-xl text-white" ref={ref} />
    </>
  );
};

export default AdditionalCard;
