import { IMovieReview } from './review';

export interface PaginationResult<T> {
  meta: PaginationMeta;
  data: T[];
}

interface PaginationMeta {
  count: number;
  // 데이터 더 있는지 판단
  hasMore: boolean;
  // after에 넣을 id
  lastId: number | null;
}

export default (): PaginationResult<IMovieReview> => ({
  meta: {
    count: 0,
    hasMore: true,
    lastId: null,
  },
  data: [],
});
