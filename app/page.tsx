import DefaultLayout from '@/components/common/defaultLayout';
import MainCarousel from '@/components/home/MainCarousel';
import Section from '@/components/home/Section';
import TmdbSection from '@/components/home/TmdbSection';
import {
  getLocalmovieList,
  getTMDBMovieList,
} from '@/utils/api/home/getMovieList';

export default async function Home() {
  const popularMovies = await getLocalmovieList({
    criteria: 'popularity',
    cache: 'cache-force',
  });
  const newMovies = await getLocalmovieList({
    criteria: 'releaseDate',
    cache: 'cache-force',
  });
  const topRated = await getLocalmovieList({
    criteria: 'voteAverage',
    cache: 'cache-force',
  });
  const upComing = await getTMDBMovieList('upcoming', 'cache-force');
  const nowPlaying = await getTMDBMovieList('now_playing', 'cache-force');
  return (
    <DefaultLayout>
      <MainCarousel list={popularMovies.data} />
      <div>
        <Section classification="Lastest Movies" list={newMovies.data} />
        <Section
          classification="Movies with heightest evaluation"
          list={topRated.data}
        />
        <TmdbSection classification="현재 상영작" list={nowPlaying.results} />
        <TmdbSection classification="개봉 예정작" list={upComing.results} />
      </div>
    </DefaultLayout>
  );
}
