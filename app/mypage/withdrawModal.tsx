'use client';

import { api } from '@/util/customAxios';
import axios from 'axios';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

async function withdrawUser(password: string) {
  await api.delete(
    '/api/users/me',

    {
      data: { password },
    },
  );
}

function WidthDrawModal() {
  const [password, setPassword] = useState('');
  //탈퇴
  const { mutate } = useMutation(withdrawUser, {
    onSuccess: () => {
      alert('탈퇴완료');
    },
  });
  return (
    <>
      <label htmlFor="my-modal-3" className="btn bg-red-500 border-none">
        탈퇴하기
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="mb-8 text-lg font-bold">
            This is a permanent action and it can not be undone. After you
            delete your account no one will be able to recover it.
          </h3>

          <form>
            <span className="font-bold mr-4">password:</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Type here"
              className="input w-3/6 max-w-xs mr-8"
            />
            <button
              onClick={() => mutate(password)}
              type="submit"
              className="btn btn-outline btn-error"
            >
              탈퇴하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default WidthDrawModal;
