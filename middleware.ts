import { withAuth } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt';

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const unavailablePathsWhenAuthenticated = ['/user/login', '/user/register'];

export default withAuth({
  pages: {
    signIn: '/user/login'
  }
})


export async function  middleware(request: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // prevent from accessing certain pages when already authenticated
  if (isAuthenticated && unavailablePathsWhenAuthenticated.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/user/profile', request.nextUrl));
  }
}

// list of pages that uses this middleware
export const config = { matcher: ["/user/profile", "/user/login", '/user/register'] }