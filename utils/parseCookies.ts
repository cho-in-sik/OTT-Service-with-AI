export default function parseCookies(cookie = '') {
  console.log('cookie : ', cookie);
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc: { [key: string]: string }, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
}
