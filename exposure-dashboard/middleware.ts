import { NextResponse } from "next/server"

// AUTHENTICATION DISABLED - Remove this file or comment out to re-enable
export default function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

/* 
// ORIGINAL AUTH CODE - Uncomment to re-enable authentication
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth

  // Public paths that don't require authentication
  const publicPaths = ['/auth/signin', '/api/auth']
  const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path))

  // If not logged in and trying to access protected route, redirect to signin
  if (!isLoggedIn && !isPublicPath) {
    const newUrl = new URL('/auth/signin', req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
*/
