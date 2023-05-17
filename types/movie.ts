export interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  voteCount: number;
  voteAverage: number;
  backdropUrl: string;
  posterUrl: string;
  lang: string;
  releaseDate: Date;
  genres: string[];
  isLiked: boolean;
  isFavorite: boolean;
}

export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Science'
  | 'Fiction'
  | 'Thriller'
  | 'TV'
  | 'Movie'
  | 'War'
  | 'Western';

export type Criteria = 'popularity' | 'voteAverage' | 'releaseDate';
