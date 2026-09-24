import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
  localePrefix: 'always',
});

const APEX_HOST = 'oldvenetianportchania.com';
const WWW_HOST = 'www.oldvenetianportchania.com';

export default function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase();

  // Consolidate non-www -> www (canonical domain per SEO analysis)
  if (host === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.host = WWW_HOST;
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
