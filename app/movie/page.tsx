import React from 'react';
import { getLocalmovieList } from '@/utils/api/home/getMovieList';
import { Genre, Movie } from '@/types/movie';
import Card from '@/components/movie/Card';
import AdditionalCard from '@/components/movie/AdditionalCard';

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  let movieList: { data: Movie[]; meta: { count: number; hasMore: boolean } };
  if (searchParams !== undefined) {
    movieList = await getLocalmovieList({
      genre: searchParams['genre'] as Genre,
      cache: 'cache-force',
      count: 12,
    });
  } else {
    movieList = await getLocalmovieList({
      cache: 'cache-force',
      count: 12,
    });
  }
  const { data, meta } = movieList;
  return (
    <div className="w-[80%] pt-16 mx-auto">
      <div className="flex justify-center my-16 ">
        <h1 className="p-5 text-4xl text-info outline">
          {searchParams && searchParams['genre'] !== undefined
            ? searchParams['genre']
            : 'ALL'}
        </h1>
      </div>
      <div className="relative grid grid-flow-row gap-4 place-items-center grid-cols-auto">
        {data.map(({ id, title, posterUrl, genres }) => (
          <Card
            key={id}
            id={id}
            title={title}
            posterUrl={posterUrl}
            genres={genres}
          />
        ))}
        <AdditionalCard
          isMounted={false}
          lastId={data[data.length - 1].id || 0}
        />
      </div>
    </div>
  );
};

export default page;
