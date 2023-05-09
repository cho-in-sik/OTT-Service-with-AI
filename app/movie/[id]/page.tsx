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
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [movieDetail, setMovieDetail] = useState<Movie>();
  //좋아요, 즐찾 버튼 추가
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  useEffect(() => {
    api
      .get<Movie>(`/api/movies/${params.id}/detail`)
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

  function handleClick() {
    const reviewBody = { title, content, rating };
    console.log(reviewBody);
    // api.post(`api/movies/${params.id}/reviews`, reviewBody);
  }
  return (
    <div className="main">
      <div className="l-container">
        <img src={movieDetail.backdropUrl} className="back-img" />
        <div className="s-container">
          <img src={movieDetail.posterUrl} className="main-img" />
          <div className="text">
            <button>좋아요</button>
            <p>Title : {movieDetail.title}</p>
            {/* <p>
              Genres :
                {movieDetail.genres.map((item) => {
                  const url = `/movie?genre=${item}`;
                  return <Link href={url}>{item},</Link>;
                })}
            </p> */}
            <p>genre : [a, b, c, d]</p>
            <p>Grade Average : {movieDetail.voteAverage}</p>
            <p>Overview : {movieDetail.overview}</p>
          </div>
        </div>
      </div>
      <form>
        <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <input
          placeholder="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          placeholder="rating"
          type="number"
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button onSubmit={() => handleClick()}>작성하기</button>
      </form>
      <style jsx>
        {`
          .main {
            padding-top: 100px;
            min-height: 110vh;
          }
          .back-img {
            position: absolute;
            opacity: 0.7;
            object-fit: cover;
          }
          .l-container {
            align-items: end;
            border: solid red 1px;
            height: 800px;
          }
          .s-container {
            position: relative;
            width: 60%;
            display: flex;
            align-items: end;
            margin-left: 10%;
          }
          .text {
            color: white;
          }
          .main-img {
            width: 25%;
            margin-left: 10%;
            margin-right: 10px;
            border: white 5px solid;
          }
        `}
      </style>
    </div>
  );
}
