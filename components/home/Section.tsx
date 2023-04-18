"use client";
//@ts-ignore
import Carousel from "react-grid-carousel";
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
    <div className="relative my-10 px-36">
      <h2 className="px-4 text-4xl font-bold">{classification}</h2>
      <Carousel cols={5} rows={1} gap={10}>
        {list.map(({ id, posterUrl, title }, idx) => (
          <Carousel.Item key={id}>
            <div>
              <Image
                className="h-[400px]"
                src={`http://localhost:3000/${posterUrl}`}
                alt={title}
                width={300}
                height={400}
              />
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Section;
