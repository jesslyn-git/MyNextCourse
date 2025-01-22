import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (!request.nextUrl.pathname.startsWith('/api/login') && !request.nextUrl.pathname.startsWith('/api/register')) {
      const cookieStore = await cookies()
      const token = cookieStore.get("access_token")

      if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

      const secret = new TextEncoder().encode(
        'rahasia',
      )
      const jwt = token?.value as string

      const { payload } = await jose.jwtVerify<{ _id: string, name: string, email: string }>(jwt, secret)

      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', payload._id)
      requestHeaders.set('x-user-name', payload.name)
      requestHeaders.set('x-user-email', payload.email)

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })

      return response

    }
  }
}

