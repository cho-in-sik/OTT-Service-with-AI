import MainCarousel from '@/components/home/MainCarousel';
import Section from '@/components/home/Section';

async function getMainMoives(): Promise<
  { posterUrl: string; title: string; id: string; overview: string }[]
> {
  const res = await fetch('http://localhost:3000/api/movies/main', {
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
}

async function getMovieLists(): Promise<
  { posterUrl: string; title: string; id: string }[][]
> {
  const res = await fetch('http://localhost:3000/api/movies/list', {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const data = await getMainMoives();
  // const list = await getMovieLists();

  return (
    <>
      <MainCarousel data={data} />
      {/* <div className="">
        <Section classification="Featured Movie" list={list[0]} />
        <Section classification="New Arrival" list={list[1]} />
      </div> */}
    </>
  );
}
