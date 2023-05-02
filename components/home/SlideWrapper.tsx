'use client';

import React, { PropsWithChildren } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, Scrollbar, Mousewheel, FreeMode } from 'swiper';

const SlideWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={5}
      scrollbar={true}
      mousewheel={true}
      freeMode={true}
      modules={[Scrollbar, Mousewheel, FreeMode]}
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
