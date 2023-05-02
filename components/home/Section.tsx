'use client';

import Image from 'next/image';
import { Movie } from '@/types/movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import SlideWrapper from './SlideWrapper';

interface Props {
  classification: string;
  list: Movie[];
}

const Section = ({ classification, list }: Props) => {
  return (
    <div className="relative my-10 px-36">
      <h2 className="px-4 text-4xl font-bold">{classification}</h2>
      <SlideWrapper>
        {list.map(({ id, posterUrl, title }, idx) => (
          <SwiperSlide key={id}>
            <div>
              <Image
                className="h-[400px]"
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${posterUrl}`}
                alt={title}
                width={300}
                height={400}
              />
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </SlideWrapper>
    </div>
  );
};

export default Section;
