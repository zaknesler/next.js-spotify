import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateToken } from './utils'

export const middleware = (req: NextRequest) => {
  if (req.cookies.get('spotify_state')) return NextResponse.next()

  const res = NextResponse.next()
  res.cookies.set('spotify_state', generateToken())
  return res
}
