import { NextRequest, NextResponse } from 'next/server';
import { GTIN_MAX_LENGTH } from '@/lib/types';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/gtin')) {
    const gtin = pathname.split('/')[2];
    if (!gtin || !/^\d+$/.test(gtin) || gtin.length > GTIN_MAX_LENGTH) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

export const config = {
  matcher: '/:path*',
};
