import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  
  // Add performance headers
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
