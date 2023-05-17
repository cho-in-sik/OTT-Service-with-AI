'use client';

import Loading from '@/app/loading';
import { getHistory } from '@/utils/api/mypage/history';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Section from '@/components/history/Section';

const Page = () => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    ['history'],
    async ({ pageParam }) => {
      const totalData = await getHistory(pageParam, 20);
      console.log(totalData);
      return totalData;
    },
    {
      getNextPageParam: (lastPage, AllPages) => {
        if (lastPage.meta.hasMore)
          return lastPage.data[lastPage.data.length - 1].id;
      },
    },
  );

  const { inView, ref } = useInView();

  useEffect(() => {
    fetchNextPage();
  }, [inView]);

  if (isLoading) return <Loading />;
  if (data?.pages.length === 0) {
    return <div>시청 기록 없음</div>;
  }
  return (
    <div className="min-h-[100vh] pt-24 w-[70%] mx-auto">
      {data?.pages.map(({ data }) => {
        return data.map(
          ({ id, title, backdropUrl, lastViewedAt, overview }: any) => (
            <Section
              key={id}
              movieId={id}
              title={title}
              backdropUrl={backdropUrl}
              lastViewedAt={lastViewedAt}
              overview={overview}
            />
          ),
        );
      })}
      <div className="text-xl text-white" ref={ref}>
        이게 보이면 추가 load 할거임
      </div>
    </div>
  );
};

export default Page;
