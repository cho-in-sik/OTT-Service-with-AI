'use client';

import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface FormValue {
  username: string;
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
    const result = await axios
      .post('http://localhost:8080/api/auth/signup', data, {
        withCredentials: true,
      })
      .then((response) => response.data);

    console.log(result);
    alert('회원가입 완료');
    router.push('/');
  };

  return (
    <>
      <div className="w-4/12 py-10 mx-auto my-16 border border-solid shadow-2xl px-14 border-gray-800/10 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              아이디
            </label>
            <input
              {...register('username', {
                required: true,
                maxLength: 20,
              })}
              type="text"
              id="username"
              className="w-full input input-bordered"
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-bold">
                {errors.username?.type === 'required' &&
                  '아이디를 입력해주세요!'}
                {errors.username?.type === 'maxLength' &&
                  '최대 20자만 입력할 수 있습니다!'}
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
              className="w-full input input-bordered"
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
              className="w-full input input-bordered"
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
              className="w-full input input-bordered"
            />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-bold">
                {errors.confirmPassword?.type === 'validate' &&
                  '비밀번호가 일치하지 않습니다.'}
              </span>
            </p>
          </div>
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
              className="w-full input input-bordered"
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
          {/* <div className='mb-6'>
                        <label
                            htmlFor='birthDateOrg'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            생년월일
                        </label>
                        <input
                            {...register('birthDateOrg', {
                                required: true,
                            })}
                            type='date'
                            id='birthDateOrg'
                            className='w-full input input-bordered'
                        />

                        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                            <span className='font-bold'>
                                {errors.birthDateOrg?.type === 'required' &&
                                    '생년월일을 입력해주세요!'}
                            </span>
                        </p>
                    </div> */}
          <div className="flex flex-col justify-between">
            <button type="submit" className="w-full btn btn-primary">
              가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
