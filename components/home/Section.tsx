'use client';

import { Movie } from '@/types/movie';
import { SwiperSlide } from 'swiper/react';
import SlideWrapper from './SlideWrapper';
import LocalCard from './LocalCard';

interface Props {
  classification: string;
  list: Movie[];
}

const Section = ({ classification, list }: Props) => {
  return (
    <div className="relative px-24 my-20">
      {/* TODO: Link  */}
      <button className="px-4 mb-5 text-4xl cursor-pointer hover:underline text-info">
        {classification}
      </button>
      <SlideWrapper>
        {list.map(({ id, posterUrl, title }) => (
          <SwiperSlide key={id}>
            <LocalCard posterUrl={posterUrl} title={title} id={id} />
          </SwiperSlide>
        ))}
      </SlideWrapper>
    </div>
  );
};

export default Section;
