import { useState } from 'react';
import { api } from '@/utils/api/customAxios';
import Image from 'next/image';

export default function PostImage() {
  const [userImageUrl, setUserImageUrl] = useState('');
  const [userImageFile, setUserImageFile] = useState<File>();

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    //file은 불러온 파일의 바이너리(0,1,0,1,01,..데이터)
    if (file) {
      //미리보기 사용

      const localImageUrl = window.URL.createObjectURL(file);
      setUserImageUrl(localImageUrl);
      setUserImageFile(file);
    }
  };

  const handleProfileImg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userImageFile) return alert('이미지가 선택되지 않았습니다');

    const formData = new FormData();
    formData.append('avatar', userImageFile);

    await api.post('/api/users/me/avatars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  return (
    <div className="mb-4">
      <form onSubmit={handleProfileImg}>
        <label className="block font-bold mb-2">프로필 이미지</label>
        <input
          onChange={handleUserImageChange}
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs "
        />
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={userImageUrl} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </form>
    </div>
  );
}
