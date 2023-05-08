'use client';

import React, { PropsWithChildren } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, Scrollbar, Mousewheel } from 'swiper';

const SlideWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      slidesPerGroup={1}
      scrollbar={{ draggable: true }}
      draggable={true}
      navigation={true}
      modules={[Scrollbar, Mousewheel, Navigation]}
      breakpoints={{
        720: {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerGroup: 2,
        },
        1080: {
          slidesPerView: 4,
          spaceBetween: 40,
          slidesPerGroup: 4,
        },
        1440: {
          slidesPerView: 5,
          spaceBetween: 50,
          slidesPerGroup: 5,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default SlideWrapper;
