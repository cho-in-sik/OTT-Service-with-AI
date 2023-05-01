'use client';

import React, { PropsWithChildren } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper';

const SlideWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={5}
      slidesPerGroup={5}
      navigation={true}
      modules={[Navigation]}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default SlideWrapper;
