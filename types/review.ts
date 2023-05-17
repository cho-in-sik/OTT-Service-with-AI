export interface IMovieReview {
  author: {
    avatarUrl: string;
    email: string;
    id: number;
    name: string;
  };
  createdAt: string;
  content: string;
  id: number;
  movieId: number;
  rating: number;
  title: string;
  overview: string;
  movieTitle: string;
}
