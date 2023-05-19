'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api/customAxios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/api/mypage/getUser';
import WidthDrawModal from '@/app/mypage/withdrawModal';
import PatchPassword from '@/app/mypage/patchPassword';
import PostImage from '@/app/mypage/postImage';

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
    onSuccess: () => {
      console.log('성공');
    },
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

  return (
    <div className="flex">
      <div className="w-8/12 py-10 mx-auto my-16 bg-white border border-solid shadow-2xl px-14 border-gray-800/10 rounded-2xl">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="mb-4">
            <label className="block mb-2 font-bold">이메일</label>
            <span>{data?.email}</span>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">이름</label>
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
          <span className="text-sm text-red-600  dark:text-red-500">
            {errors.username?.message}
          </span>
          <button type="submit" className="block mt-4 btn btn-primary">
            저장
          </button>

          <div className="divider"></div>

          {/* <div className="mb-4">
          <label className="block mb-2 font-bold">생년월일</label>
          <input type="date" className="input input-bordered " />
        </div> */}
        </form>
        <PatchPassword />

        <div className="divider"></div>
        <PostImage />
        <div>
          <div className="block mb-2 font-bold text-red-500 dark:text-red-500">
            회원탈퇴
          </div>
          {/* 회원탈퇴 모달창 */}
          <WidthDrawModal />
        </div>
      </div>
    </div>
  );
}
