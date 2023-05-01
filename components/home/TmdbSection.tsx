'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import SlideWrapper from './SlideWrapper';

interface Props {
  classification: string;
  list: {
    title: string;
    id: number;
    poster_path: string;
  }[];
}

const TmdbSection = ({ classification, list }: Props) => {
  return (
    <div className="relative my-10 px-36">
      <h2 className="px-4 text-4xl font-bold">{classification}</h2>
      <SlideWrapper>
        {list.map(({ id, poster_path, title }) => (
          <SwiperSlide key={id}>
            <Image
              className="h-[400px]"
              src={`${process.env.NEXT_PUBLIC_TMDB_IMG_BASE_URL}/w300${poster_path}`}
              alt={title}
              width={300}
              height={400}
            />
            <h3 className="text-xl font-bold">{title}</h3>
          </SwiperSlide>
        ))}
      </SlideWrapper>
    </div>
  );
};

export default TmdbSection;
