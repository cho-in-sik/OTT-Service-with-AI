import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const ACCESS_TOKEN = request.cookies.get('ACCESS_TOKEN');
  const REFRESH_TOKEN = request.cookies.get('REFRESH_TOKEN');

  console.log(ACCESS_TOKEN);
  console.log(REFRESH_TOKEN);

  if (request.nextUrl.pathname.includes('auth') && ACCESS_TOKEN)
    return NextResponse.redirect(new URL('/', request.url));

  if (
    request.nextUrl.pathname.includes('mypage') &&
    !ACCESS_TOKEN &&
    !REFRESH_TOKEN
  )
    return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth/:path*', '/mypage/:path*'],
};
