import Spinner from '@/components/common/spinner';
import React from 'react';
//@ts-ignore
const Loading = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <Spinner />
    </div>
  );
};

export default Loading;
