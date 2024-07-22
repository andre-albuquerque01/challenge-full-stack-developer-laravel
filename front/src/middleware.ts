import { type NextRequest, NextResponse } from 'next/server'
import verifyToken from './functions/data/verify-token'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const authentication = token ? await verifyToken(token) : false
  if (
    (!authentication && request.nextUrl.pathname.startsWith('/dashboard')) ||
    request.nextUrl.pathname.startsWith('/user/update') ||
    request.nextUrl.pathname.startsWith('student/insert')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (authentication && request.nextUrl.pathname.endsWith('/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next()
}
