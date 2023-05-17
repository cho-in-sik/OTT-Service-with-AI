import { IMovieReview } from '@/types/review';
import { api } from '../customAxios';
import { PaginationResult } from '@/types/paginationResult';

// null을 넣어줘도 되고,
// 숫자 -1일 경우 after 생략 이런 식으로 가능할듯?
export async function getMovieReviews(
  movieId: number,
  lastReviewId: number | null,
) {
  const { data } = await api.get<PaginationResult<IMovieReview>>(
    `/api/movies/${movieId}/reviews`,
    {
      params: {
        // 가장 최근 review 20개 가져올 때는 after 생략.
        // 이후는 최근 가져온 review 중 가장 마지막 review의 id를 넣어주면 됨
        ...(lastReviewId !== null && { after: lastReviewId }),
        // 만약 lastReviewId가 0 미만일 경우, && 연산이기 때문에 무조건 앞에 것으로 평가됨
        // 그래서 그냥 아무 것도 없는 빈칸 ...(true)니까

        // 만약 lastReviewId가 0 이상일 경우, 뒤에가 평가됨
        // ...{ after: lastReviewId }
        // after: lastReviewId

        // id를 넣으면 됨. id 이후의 데이터를 가져옴, 안 넣어주면 가장 최신 review id부터 20개
        // count: 20, 안 넣어주면 기본 20개 들어감
      },
    },
  );
  return data;
}
