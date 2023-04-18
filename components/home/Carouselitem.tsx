import React, { useState } from "react";
import Image from "next/image";

interface Props {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
}

const CarouselItem = ({ id, title, overview, posterUrl }: Props) => {
  return (
    <div
      className="justify-around w-full h-full ml-auto mr-auto carousel-item"
      key={id}
      id={id}
    >
      <div className="mt-auto mb-auto text-white w-[40rem]">
        <h1 className="mb-4 font-bold break-words text-7xl">{title}</h1>
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
  );
};

export default CarouselItem;
