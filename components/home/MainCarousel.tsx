'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movie } from '@/types/movie';
import { Mousewheel, Pagination } from 'swiper';

const MainCarousel = ({ list }: { list: Movie[] }) => {
  return (
    <>
      <div className="h-[600px] mb-10 bg-gradient-to-r from-cyan-500 to-blue-500">
        <Swiper
          direction={'vertical'}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Mousewheel, Pagination]}
        >
          {list.map(({ posterUrl, title, id, overview }, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div
                  className="flex justify-around w-full h-full ml-auto mr-auto "
                  key={id}
                  id={String(id)}
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default MainCarousel;
