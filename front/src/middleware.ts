import { type NextRequest, NextResponse } from 'next/server'
import verifyToken from './functions/data/verify-token'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const authentication = token ? await verifyToken(token) : false
  if (
    !authentication &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/user/update') ||
      request.nextUrl.pathname.startsWith('/student/insert') ||
      request.nextUrl.pathname.startsWith('/student/update') ||
      request.nextUrl.pathname.startsWith('/student/search'))
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (
    authentication &&
    (request.nextUrl.pathname.endsWith('/') ||
      request.nextUrl.pathname.startsWith('user/login'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next()
}
