import { useState } from 'react';
import { api } from '@/utils/api/customAxios';
import Image from 'next/image';

export default function PostImage() {
  const [userImageUrl, setUserImageUrl] = useState('');
  const [userImageFile, setUserImageFile] = useState<File | null>(null);

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      //미리보기 사용해보려고 일단 적어보기 아직구현 x
      let image = window.URL.createObjectURL(file);
      setUserImageUrl(image);
      setUserImageFile(file);
    }
    console.log(file);
  };

  //아직안됨
  const handleProfileImg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userImageFile) return alert('이미지가 선택되지 않았습니다');
    console.log(userImageFile);

    await api.post('/api/users/me/avatars', {
      avatarUrl: userImageFile.name,
    });
  };
  return (
    <div className="mb-4">
      <form onSubmit={handleProfileImg}>
        <label className="block font-bold mb-2">프로필 이미지</label>
        <input
          onChange={handleUserImageChange}
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs mr-4"
        />
        <div className="avatar">
          <div className="w-24 rounded-full">
            {/* <Image src="/example.png"/> */}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </form>
    </div>
  );
}
