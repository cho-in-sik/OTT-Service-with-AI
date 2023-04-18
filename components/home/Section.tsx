import React from "react";
import Image from "next/image";

interface Props {
  classification: string;
  list: {
    id: string;
    title: string;
    posterUrl: string;
  }[];
}

const Section = ({ classification, list }: Props) => {
  return (
    <div className="my-8">
      <h2 className="text-4xl font-bold ">{classification}</h2>
      <div className="carousel carousel-end">
        {list.map(({ id, posterUrl, title }, idx) => (
          <div className="carousel-item w-80" key={id}>
            <div className="">
              <Image
                className="h-[400px]"
                src={`http://localhost:3000/${posterUrl}`}
                alt={title}
                width={300}
                height={400}
              />
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
