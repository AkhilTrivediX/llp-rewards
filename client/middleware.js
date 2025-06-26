import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Define redirect map
  const redirects = {
    "/sally's": '/sallys',
    '/BIGBUCK': '/bigbuck',
  };

  for (const key in redirects) {
    if (pathname.startsWith(key)) {
      url.pathname = pathname.replace(key, redirects[key]);
      return NextResponse.redirect(url, 301); // permanent redirect
    }
  }

  return NextResponse.next();
}