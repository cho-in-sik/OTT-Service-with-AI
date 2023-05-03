'use client';

import { SwiperSlide } from 'swiper/react';
import SlideWrapper from './SlideWrapper';
import TmdbCard from './TmdbCard';

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
      {/* TODO: Link  */}
      <button className="px-4 mb-5 text-4xl cursor-pointer hover:underline text-info">
        {classification}
      </button>
      <SlideWrapper>
        {list.map(({ id, poster_path, title }) => (
          <SwiperSlide key={id}>
            <TmdbCard posterUrl={poster_path} title={title} id={id} />
          </SwiperSlide>
        ))}
      </SlideWrapper>
    </div>
  );
};

export default TmdbSection;
