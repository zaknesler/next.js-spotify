import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { generateToken } from './utils'

type Middleware = (req: NextRequest, res: NextResponse) => void

const middlewares: Array<Middleware> = [
  async (req, res) => {
    if (req.cookies.get('spotify_state')) return
    res.cookies.set('spotify_state', generateToken())
  },
]

export const middleware = (req: NextRequest) => {
  let res = NextResponse.next()
  middlewares.forEach(m => m(req, res))
  return res
}
