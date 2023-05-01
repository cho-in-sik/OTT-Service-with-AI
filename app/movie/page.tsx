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
  return (
    <div>
      <h4>hello</h4>
      <p>{movieDetail.title}</p>
      <p>{movieDetail.voteAverage}</p>
      <img src={movieDetail.posterUrl} />
      <p>{movieDetail.overview}</p>
    </div>
  );
}
