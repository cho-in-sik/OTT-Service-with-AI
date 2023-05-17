import dayjs, { Dayjs } from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
dayjs.extend(duration);

//dayjs 라이브러리 사용 util 함수

export function getTimeDiff(timeToCompare: string) {
  const timeDiffDuration: Duration = dayjs.duration(
    dayjs().diff(timeToCompare),
  );
  const yearDiff: number = parseInt(timeDiffDuration.format('Y'));
  const monthDiff: number = parseInt(timeDiffDuration.format('M'));

  const dateDiff: number = parseInt(timeDiffDuration.format('D'));
  const hourDiff: number = parseInt(timeDiffDuration.format('H'));
  const minuteDiff: number = parseInt(timeDiffDuration.format('m'));
  const secondDiff: number = parseInt(timeDiffDuration.format('s'));

  if (yearDiff > 0) {
    return `${yearDiff}년 전`;
  } else if (monthDiff > 0) {
    return `${monthDiff}달 전`;
  } else if (dateDiff > 0) {
    return `${dateDiff}일 전`;
  } else if (hourDiff > 0) {
    return `${hourDiff}시간 전`;
  } else if (minuteDiff > 0) {
    return `${minuteDiff}분 전`;
  } else if (secondDiff > 0) {
    return `${secondDiff}초 전 `;
  } else {
    return '';
  }
}

// export function getDateBefore(index: string) {
//   //지금
//   const nowDate = new Date().toString();
//   const madeDate = new Date(index).toUTCString();

//   //madeDate 와 nowDate 차이
//   const betweenTime = Math.floor(
//     (Date.parse(nowDate) - (Date.parse(madeDate) - 32399000)) / 1000 / 60,
//   );

//   const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

//   if (betweenTime < 1) return '방금전';
//   if (betweenTime < 60) {
//     return `${betweenTime}분전`;
//   }

//   const betweenTimeHour = Math.floor(betweenTime / 60);

//   if (betweenTimeHour < 24) {
//     return `${betweenTimeHour}시간전`;
//   }
//   if (betweenTimeDay < 365) {
//     return `${betweenTimeDay}일전`;
//   } else {
//     return '1년이상';
//   }
// }
