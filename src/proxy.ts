import { GTIN_MAX_LENGTH } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

const VALID_ROUTES = [
  /^\/$/,
  /^\/search$/,
  new RegExp(`^\\/gtin\\/\\d{1,${GTIN_MAX_LENGTH}}$`),
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!VALID_ROUTES.some(pattern => pattern.test(pathname))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
