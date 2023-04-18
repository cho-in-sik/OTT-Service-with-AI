"use client";
import React, { useState } from "react";
import CarouselItem from "./Carouselitem";
import { set } from "react-hook-form";

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
  const [slideNum, setSlideNum] = useState<number>(0);
  return (
    <>
      <div className="h-[600px] carousel bg-gradient-to-r from-cyan-500 to-blue-500">
        {data.map(({ posterUrl, title, id, overview }) => {
          return (
            <CarouselItem
              posterUrl={posterUrl}
              title={title}
              id={id}
              overview={overview}
              key={id}
            />
          );
        })}
      </div>
      <div className="flex justify-center w-full gap-2 py-2">
        {data.map(({ id }, idx) => (
          <a
            href={`#${id}`}
            className={`text-lg btn btn-s btn-outline btn-info ${
              slideNum === idx && "bg-cyan-200 text-black"
            }`}
            key={id}
            onClick={() => {
              setSlideNum(idx);
            }}
          >
            {idx + 1}
          </a>
        ))}
      </div>
    </>
  );
};

export default MainCarousel;
