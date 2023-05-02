'use client';

import axios from 'axios';
import { api } from '@/utils/api/customAxios';
import { Movie } from '@/types/movie';

export default function MovieDetail({ movieDetail }: any) {
  return (
    <div>
      <h4>{movieDetail?.title}</h4>
      <img src={movieDetail?.posterUrl} />
      <p>{movieDetail}</p>
      {/* 리뷰 컴포넌트 */}
      {/* 유사한 영화 찾아주는 컴포넌트 */}
    </div>
  );
}

export async function getServerSideProps({ params: { params } }: any) {
  const movieDetail = await (
    await api.get<Movie>(`/api/movies/detail/${params}`)
  ).data;

  return {
    props: {
      movieDetail,
    },
  };
}
