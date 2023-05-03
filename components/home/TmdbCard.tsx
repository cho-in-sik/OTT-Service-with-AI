'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  id: number;
  title: string;
  posterUrl: string;
}

const TmdbCard = ({ id, title, posterUrl }: Props) => {
  const [src, setSrc] = useState<string>(
    `${process.env.NEXT_PUBLIC_TMDB_IMG_BASE_URL}/w300${posterUrl}`,
  );
  const router = useRouter();
  return (
    <div className="h-auto shadow-xl card w-80 bg-base-100">
      <figure>
        <Image
          src={src}
          alt={title}
          width={320}
          height={480}
          style={{ height: '480px', cursor: 'pointer' }}
          onClick={() => {
            router.push(`/movie/${id}`);
          }}
          onError={() => {
            setSrc(`${process.env.NEXT_PUBLIC_CLIENT_URL}/default_movie.jpg`);
          }}
        />
      </figure>
      <div className="card-body h-36">
        <h2 className="max-h-16 card-title w-60">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
      </div>
    </div>
  );
};

export default TmdbCard;
