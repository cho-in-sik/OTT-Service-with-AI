'use client';
import React, { useState } from 'react';
import Image from 'next/image';
//@ts-ignore
import Carousel from 'react-grid-carousel';
interface Data {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
}

interface Props {
  data: Data[];
}

const MainCarousel = ({ data }: Props) => {
  return (
    <>
      <div className="h-[600px] mb-10 bg-gradient-to-r from-cyan-500 to-blue-500">
        <Carousel cols={1} rows={1} loop autoplay={2000} showDots hideArrow>
          {data.map(({ posterUrl, title, id, overview }, idx) => {
            return (
              <Carousel.Item key={idx}>
                <div
                  className="flex justify-around w-full h-full ml-auto mr-auto "
                  key={id}
                  id={id}
                >
                  <div className="mt-auto mb-auto text-white w-[40rem]">
                    <h1 className="mb-4 font-bold break-words text-7xl">
                      {title}
                    </h1>
                    <p className="text-xl break-words">{overview}</p>
                  </div>
                  {/* TODO: 이미지 클릭시 상세페이지로 이동 */}
                  <Image
                    className="h-[600px]"
                    src={`http://localhost:3000/${posterUrl}`}
                    alt={title}
                    width={450}
                    height={600}
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default MainCarousel;
