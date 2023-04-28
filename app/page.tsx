import MainCarousel from '@/components/home/MainCarousel';
import Section from '@/components/home/Section';
import TmdbSection from '@/components/home/TmdbSection';
import {
  getMovieHistory,
  getFavoriteMovies,
  getLocalmovieList,
  getTMDBMovieList,
} from '@/utils/api/home/getMovieList';

export default async function Home() {
  // const popularMovies = await getLocalmovieList({
  //   criteria: 'popularity',
  //   cache: 'cache-force',
  // });
  // const newMovies = await getLocalmovieList({
  //   criteria: 'releaseDate',
  //   cache: 'cache-force',
  // });
  // const topRated = await getLocalmovieList({
  //   criteria: 'voteAverage',
  //   cache: 'cache-force',
  // });
  const upComing = await getTMDBMovieList('upcoming', 'cache-force');
  const nowPlaying = await getTMDBMovieList('now_playing', 'cache-force');
  // const favorite = await getFavoriteMovies({ cache: 'no-store' });
  // const history = await getMovieHistory({ cache: 'no-store' });

  return (
    <>
      {/* <MainCarousel list={popularMovies} /> */}
      <div>
        {/* <Section classification="찜한 영화" list={favorite} />
          <Section classification="시청한 영화" list={history} />
          <Section classification="최신 영화" list={newMovies} />
          <Section classification="최고 평점 영화" list={topRated} /> */}
        <TmdbSection classification="현재 상영작" list={nowPlaying.results} />
        <TmdbSection classification="개봉 예정작" list={upComing.results} />
      </div>
    </>
  );
}
