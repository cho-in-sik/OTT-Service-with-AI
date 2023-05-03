'use client';

import React, { PropsWithChildren } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, Scrollbar, Mousewheel, FreeMode } from 'swiper';

const SlideWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      draggable={true}
      freeMode={true}
      modules={[Scrollbar, Mousewheel, FreeMode]}
      breakpoints={{
        720: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1080: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1440: {
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
