'use client';

import React, { useEffect, useState } from 'react';
import { getLikeMovieList } from '@/utils/api/home/getMovieList';
import { Movie } from '@/types/movie';
import Card from '@/components/movie/Card';
import AdditionalCard from '@/components/movie/AdditionalCard';

const Page = () => {
  const [movieList, setMovieList] = useState<{
    data: Movie[];
    meta: { count: number; hasMore: boolean };
  }>();

  useEffect(() => {
    getLikeMovieList({
      cache: 'no-cache',
    }).then((result) => {
      setMovieList(result);
    });
  }, []);

  return (
    <div className="w-[80%] pt-16 mx-auto">
      <div className="flex justify-center my-16 ">
        <h1 className="p-5 text-4xl text-info outline">LIKE</h1>
      </div>
      <div className="grid grid-flow-row gap-4 place-items-center grid-cols-auto mb-16">
        {movieList?.data.map(({ id, title, posterUrl, genres }) => (
          <Card
            key={id}
            id={id}
            title={title}
            posterUrl={posterUrl}
            genres={genres}
          />
        ))}
        {/* <AdditionalCard
          lastId={movieList?.data[movieList?.data.length - 1].id || 0}
        /> */}
      </div>
    </div>
  );
};

export default Page;
