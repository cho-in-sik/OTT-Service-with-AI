'use client';
import axios from 'axios';
import react, { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { api } from '@/utils/api/customAxios';

export default function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState<Movie>();
  useEffect(() => {
    api
      .get<Movie>('/api/movies/detail/502356')
      .then((res) => {
        setMovieDetail(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (movieDetail === undefined) {
    return <h1>Error</h1>;
  }
  function genres(arr: T[]) {
    return arr.map((item) => item.name + ',');
  }
  return (
    <div>
      <img src={movieDetail.posterUrl} className="img" />
      <p>Title : {movieDetail.title}</p>
      <p>Genres : {genres(movieDetail.genres)}</p>
      <p>Grade Average : {movieDetail.voteAverage}</p>
      <p>Overview : {movieDetail.overview}</p>

      <style jsx>
        {`
          .img {
            width: 30%;
            display: flex;
          }
        `}
      </style>
    </div>
  );
}
