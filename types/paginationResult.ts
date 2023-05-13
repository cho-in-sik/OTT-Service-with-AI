export interface PaginationResult<T> {
  meta: PaginationMeta;
  data: T[];
}

interface PaginationMeta {
  count: number;
  hasMore: boolean;
}

export const newInitPaginationResult = () => ({
  meta: {
    count: 0,
    hasMore: true,
  },
  data: [],
});

// [1,2,3,4,5,6,...,10]
// -> 뒤에없음
// hasMore true면은 보내고, 아니면 안보냄
// -> 요청을 한 번 더 보내야됨...
