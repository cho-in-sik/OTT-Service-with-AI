import MainCarousel from '@/components/home/MainCarousel';
import Section from '@/components/home/Section';
import TmdbSection from '@/components/home/TmdbSection';

async function getMainMoives(): Promise<
  { posterUrl: string; title: string; id: string; overview: string }[]
> {
  const res = await fetch('http://localhost:3000/api/movies/main', {
    cache: 'force-cache',
  });

  const data = await res.json();
  return data;
}

async function getMovieLists(): Promise<
  { posterUrl: string; title: string; id: string }[][]
> {
  const res = await fetch('http://localhost:3000/api/movies/list', {
    cache: 'force-cache',
  });
  const data = await res.json();
  return data;
}

async function getTMDBList(path: 'now_playing' | 'upcoming') {
  const res = await fetch(
    `${process.env.TMDB_API_BASE_URL}/${path}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
    {
      cache: 'force-cache',
    },
  );
  const data = await res.json();
  return data;
}

export default async function Home() {
  const data = await getMainMoives();
  const list = await getMovieLists();
  const upComing = await getTMDBList('upcoming');
  const nowPlaying = await getTMDBList('now_playing');
  return (
    <>
      <MainCarousel data={data} />
      <div className="">
        <Section classification="Popular" list={list[0]} />
        <Section classification="Top Rated" list={list[1]} />
        <TmdbSection classification="Upcoming" list={upComing.results} />
        <TmdbSection classification="Now Playing" list={nowPlaying.results} />
      </div>
    </>
  );
}
