'use client';

import Loading from '@/app/loading';
import { getHistory } from '@/utils/api/mypage/history';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

  useMemo(() => {
    dayjs.extend(relativeTime);
  }, []);

  if (isLoading) return <Loading />;
  if (data?.pages.length === 0) {
    return <div>시청 기록 없음</div>;
  }
  return (
    <div className="h-[100vh] pt-24">
      {data?.pages.map(({ data }) => {
        return data.map(
          ({ id, title, genres, posterUrl, lastViewedAt }: any) => (
            <div className="text-4xl text-white" key={id}>
              {title} {dayjs(lastViewedAt).fromNow()}
            </div>
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
