'use client';

import { api } from '@/utils/api/customAxios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface IFormData {
  oldPassword: string;
  newPassword: string;
  newPassword1: string;
}

export default function PatchPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>();

  const onValid = async (data: IFormData) => {
    //비밀번호, 비밀번호 확인이 같은지 체크
    if (data.newPassword !== data.newPassword1) {
      setError(
        'newPassword1',
        { message: 'Password are not the same' },
        { shouldFocus: true },
      );
    }

    const res = await api.patch('/api/users/me/password', {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    console.log(res);

    alert('수정완료');
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="mb-4">
        <label className="block font-bold mb-2">비밀번호</label>
        <input
          {...register('oldPassword', {
            required: 'Password is required!',
            minLength: {
              value: 8,
              message: 'Password is Toooooo short!!!!!',
            },
            maxLength: {
              value: 20,
              message: 'Password is Toooooo long!!!!!',
            },
          })}
          type="password"
          className="input input-bordered "
        />
      </div>
      <span className=" text-sm text-red-600 dark:text-red-500">
        {errors.oldPassword?.message}
      </span>

      <div className="mb-4">
        <label className="block font-bold mb-2">새로운 비밀번호</label>
        <input
          {...register('newPassword', {
            required: 'Password is required!',
            minLength: {
              value: 8,
              message: 'Password is Toooooo short!!!!!',
            },
            maxLength: {
              value: 20,
              message: 'Password is Toooooo long!!!!!',
            },
          })}
          type="password"
          className="input input-bordered "
        />
      </div>
      <span className=" text-sm text-red-600 dark:text-red-500">
        {errors.newPassword?.message}
      </span>

      <div className="mb-4">
        <label className="block font-bold mb-2">새로운 비밀번호 확인</label>
        <input
          {...register('newPassword1', {
            required: 'Password1 is required!',
            minLength: {
              value: 8,
              message: 'Password is Toooooo short!!!!!',
            },
            maxLength: {
              value: 20,
              message: 'Password is Toooooo long!!!!!',
            },
          })}
          type="password"
          className="input input-bordered "
        />
      </div>
      <span className=" text-sm text-red-600 dark:text-red-500">
        {errors.newPassword1?.message}
      </span>
      <button type="submit" className="mt-4 block btn btn-primary">
        저장
      </button>
    </form>
  );
}
