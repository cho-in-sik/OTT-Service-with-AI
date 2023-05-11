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
        setIsLiked(res.data.isLiked);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (movieDetail === undefined) {
    return <h1>Error</h1>;
  }

  function handleClickLike() {
    api.post(`/api/movies/${params.id}/like`, { nextLike: !isLiked });
    setIsLiked((prev) => !prev);
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
            <button onClick={handleClickLike}>
              {!isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
              )}
            </button>
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
