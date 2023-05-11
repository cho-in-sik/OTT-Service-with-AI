export function getDateBefore(index: string) {
  //지금
  const nowDate = new Date().toString();
  const madeDate = new Date(index).toUTCString();

  //madeDate 와 nowDate 차이
  const betweenTime = Math.floor(
    (Date.parse(nowDate) - (Date.parse(madeDate) - 32399000)) / 1000 / 60,
  );

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);

  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  } else {
    return '1년이상';
  }
}
