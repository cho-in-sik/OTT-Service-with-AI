import React from 'react';
import { getLocalmovieList } from '@/utils/api/home/getMovieList';
import { Genre, Movie } from '@/types/movie';
import Image from 'next/image';

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  let movieList: Movie[];
  if (searchParams !== undefined) {
    movieList = await getLocalmovieList({
      genre: searchParams['genre'] as Genre,
      cache: 'cache-force',
    });
  } else {
    movieList = await getLocalmovieList({
      cache: 'cache-force',
    });
  }
  return (
    <div className="w-[80%] pt-16">
      <h1>{searchParams ? searchParams['genre'] : 'ALL'}</h1>
      <div className="grid grid-cols-4 gap-4">
        {movieList.map(({ id, title, posterUrl, genres }, idx) => (
          <div key={idx}>
            <h3>{title}</h3>
            <Image src={posterUrl} alt={title} width={400} height={300}></Image>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
