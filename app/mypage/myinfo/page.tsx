'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api/customAxios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/api/mypage/getUser';
import WidthDrawModal from '../withdrawModal';
import Loading from '@/app/loading';
import PatchPassword from '../patchPassword';
import PostImage from '../postImage';

interface IFormData {
  username: string;
}

export default function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>();
  //next 에서의 react-router-dom의 기능
  const router = useRouter();

  const { data } = useQuery(['userInfo'], getUser, {
    suspense: true,
    useErrorBoundary: true,
    retry: 0,
  });
  console.log(data);

  //수정
  const onValid = async (data: IFormData) => {
    //비밀번호, 비밀번호 확인이 같은지 체크

    await api.patch('/api/users/me/name', {
      name: data.username,
      // password: data.password,
    });

    alert('수정완료');
    router.push('/');
  };

  // if (1) {
  //   throw new Error();
  // }
  // 원래는 이렇게 해줌
  // MyPage에서 에러 발생시, Errorboundary의 fallback 컴포넌트가 렌더링
  // MyPage 로딩 시, Suspense의 fallback 컴포넌트가 렌더링
  // <Errorboundary fallback={<Error />}>
  //   <Suspense fallback={<Loading />}></Suspense>
  //   <MyPage/>
  //   </Suspense>
  //   </Errorboundary>

  // Next 13부터는,
  // 자동으로 ErrorBoundary와 Suspense를 '보이지 않지만' 자동으로 감싸줌
  // <MyPage/> 와 같이 컴포넌트를 만들고, 가장 가까운 level의
  // error.tsx가 ErrorBoundary의 fallback 컴포넌트가 되고,
  // 가장 가까운 level의 loading.tsx가 Suspense의 fallback 컴포넌트가 됨
  // 다만, top level의 template.tsx, layout.tsx는 제외.
  // 이 둘은 top level의 global-error.tsx가 잡아줌
  // 근데, 버그인듯.. 지금은 안잡아줌
  return (
    <div className="flex">
      <div className="px-14 py-10 w-8/12 mx-auto my-16 border-solid border border-gray-800/10 rounded-2xl shadow-2xl ">
        <form onSubmit={handleSubmit(onValid)}>
          {/* <img src={`http://localhost:8080${data.avatarUrl}`} /> */}
          <div className="mb-4">
            <label className="block font-bold mb-2">이메일</label>
            <span>{data?.email}</span>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">이름</label>
            <input
              {...register('username', {
                required: 'Username is required!',
                maxLength: {
                  value: 6,
                  message: '너무 길어요',
                },
              })}
              type="text"
              className="input input-bordered"
              defaultValue={data?.name}
            />
          </div>
          <span className=" text-sm text-red-600 dark:text-red-500">
            {errors.username?.message}
          </span>
          <button type="submit" className="mt-4 block btn btn-primary">
            저장
          </button>

          <div className="divider"></div>

          {/* <div className="mb-4">
          <label className="block font-bold mb-2">생년월일</label>
          <input type="date" className="input input-bordered " />
        </div> */}
        </form>
        <PatchPassword />

        <div className="divider"></div>
        <PostImage />
        <div>
          <div className="block font-bold mb-2 text-red-500 dark:text-red-500">
            회원탈퇴
          </div>
          {/* 회원탈퇴 모달창 */}
          <WidthDrawModal />
        </div>
      </div>
    </div>
  );
}
