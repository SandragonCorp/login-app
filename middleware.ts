import { withAuth } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt';

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const unavailablePathsWhenAuthenticated = ['/user/login', '/user/register'];
const unavailablePathsWhenUnAuthenticated = ['/user/profile'];

export default withAuth({
  pages: {
    signIn: '/user/login'
  }
})


export async function  middleware(request: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // prevent from accessing certain pages when AUTHENTICATED
  if (isAuthenticated && unavailablePathsWhenAuthenticated.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/user/profile', request.nextUrl));
  }

  // prevent from accessing certain pages when UNAUTHENTICATED
  if (!isAuthenticated && unavailablePathsWhenUnAuthenticated.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/user/login', request.nextUrl));
  }
}

// list of pages that uses this middleware
export const config = { matcher: ["/user/profile", "/user/login", '/user/register'] }