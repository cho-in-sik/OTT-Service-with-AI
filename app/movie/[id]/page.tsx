'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api/customAxios';
import { Movie } from '@/types/movie';
import Link from 'next/link';

export default function MovieDetail({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [movieDetail, setMovieDetail] = useState<Movie>();
  useEffect(() => {
    api
      .get<Movie>(`/api/movies/detail/${params.id}`)
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
    return arr.map((item) => {
      const url = `/movie?genre=${item.name}`;
      return <Link href={url}>{item.name},</Link>;
    });
  }
  return (
    <div className="main">
      <div className="l-container">
        <img src={movieDetail.backdropUrl} className="back-img" />
        <div className="s-container">
          <img src={movieDetail.posterUrl} className="main-img" />
          <div className="text">
            <p>Title : {movieDetail.title}</p>
            <p>Genres : {genres(movieDetail.genres)}</p>
            <p>Grade Average : {movieDetail.voteAverage}</p>
            <p>Overview : {movieDetail.overview}</p>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .main {
            padding-top: 100px;
            min-height: 110vh;
          }
          .back-img {
            padding: 1px;
            display: flex;
            position: absolute;
            opacity: 0.8;
          }
          .l-container {
            align-items: end;
          }
          .s-container {
            position: absolute;
            display: flex;
            align-items: end;
            justify-content: left;
            margin-top: 20%;
          }
          .text {
            width: 40%;
            color: white;
          }
          .main-img {
            width: 15%;
            display: flex;
            float: left;
            margin-left: 20%;
            margin-right: 10px;
            border: white 5px solid;
          }
        `}
      </style>
    </div>
  );
}
