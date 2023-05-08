'use client';

import React, { useState, useEffect } from 'react';
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
  const [movieId, setMovieId] = useState(lastId); // alternative query param
  const [skipNum, setSkipNum] = useState(20); // deprecated api query param

  const { data, fetchNextPage } = useInfiniteQuery(
    ['movies', genre, skipNum],
    async ({ pageParam = 1 }) => {
      console.log('page:', pageParam);
      let data: Movie[];
      if (genre) {
        data = await getLocalmovieList({
          skip: skipNum,
          cache: 'cache-force',
          genre: genre as Genre,
        });
      } else {
        data = await getLocalmovieList({
          skip: skipNum,
          cache: 'cache-force',
        });
      }
      return {
        result: data,
        nextPage: pageParam + 1,
      };
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    },
  );

  useEffect(() => {
    fetchNextPage();
  }, [inView]);

  return (
    <>
      {data?.pages.map(({ result, nextPage }) => {
        return result.map(({ id, title, genres, posterUrl }) => (
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
