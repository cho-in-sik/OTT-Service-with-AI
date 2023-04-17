import Image from "next/image";

async function getMainMoives() {
  const res = await fetch("http://localhost:3000/api/movies", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const data = await getMainMoives();

  return (
    <div className="h-[450px] carousel carousel-vertical bg-gradient-to-r from-cyan-500 to-blue-500">
      {data.map(({ posterUrl, title, id, overview }: any) => {
        return (
          <>
            <div
              className="justify-around h-full carousel-item w-[80%] ml-auto mr-auto"
              key={id}
            >
              <div className="mt-auto mb-auto text-white">
                <h1 className="mb-4 text-5xl font-bold">{title}</h1>
                <p className=" w-96">{overview}</p>
              </div>
              {/* TODO: 이미지 클릭시 상세페이지로 이동 */}
              <Image
                className=""
                src={`http://localhost:3000/${posterUrl}`}
                alt={title}
                width={300}
                height={450}
              />
            </div>
          </>
        );
      })}
    </div>
  );
}
