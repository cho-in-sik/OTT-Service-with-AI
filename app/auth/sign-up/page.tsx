'use client';

import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api/customAxios';

interface FormValue {
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const router = useRouter();

  // 비밀번호와 비밀번호 확인이 일치하는지 검증하기 위해 "password" input 의 value 를 추적함
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const onSubmitHandler: SubmitHandler<FormValue> = async (data) => {
    const result = await api
      .post('/api/auth/signup', data, {
        withCredentials: true,
      })
      .then((response) => response.data);

    alert('회원가입 완료');
    router.push('/');
  };

  return (
    <div className="flex">
      <div className="px-14 py-10 mx-auto my-[128px] border-solid border border-gray-800/10 rounded-2xl shadow-2xl bg-white">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              이메일
            </label>
            <input
              {...register('email', {
                required: true,
                maxLength: 20,
                pattern: /^\S+@\S+$/i,
              })}
              type="text"
              id="email"
              className="input input-bordered w-full"
              placeholder="test@test.com"
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-bold">
                {errors.email?.type === 'required' && '이메일을 입력해주세요!'}
                {errors.email?.type === 'maxLength' &&
                  '최대 20자만 입력할 수 있습니다!'}
                {errors.email?.type === 'pattern' &&
                  '이메일 양식이 올바르지 않습니다!'}
              </span>
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              이름
            </label>
            <input
              {...register('name', {
                required: true,
                maxLength: 6,
              })}
              type="text"
              id="name"
              className="input input-bordered w-full"
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-bold">
                {errors.name?.type === 'required' && '이름을 입력해주세요!'}
                {errors.name?.type === 'maxLength' &&
                  '최대 6자만 입력할 수 있습니다!'}
              </span>
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              비밀번호
            </label>
            <input
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
              type="password"
              id="password"
              className="input input-bordered w-full"
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-bold">
                {errors.password?.type === 'required' &&
                  '비밀번호를 입력해주세요!'}
                {errors.password?.type === 'minLength' &&
                  '최소 8자부터 입력할 수 있습니다!'}
                {errors.password?.type === 'maxLength' &&
                  '최대 20자까지 입력할 수 있습니다!'}
              </span>
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              비밀번호 확인
            </label>
            <input
              {...register('confirmPassword', {
                validate: (value) => value === passwordRef.current,
              })}
              type="password"
              id="confirmPassword"
              className="input input-bordered w-full"
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-bold">
                {errors.confirmPassword?.type === 'validate' &&
                  '비밀번호가 일치하지 않습니다.'}
              </span>
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <button type="submit" className="btn btn-primary w-full">
              가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
