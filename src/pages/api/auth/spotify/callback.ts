import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_KEYS } from '../../../../utils/api/spotify/constants'
import { serialize } from 'cookie'

type SpotifyAuthResponse = {
  code: string
  state: string
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query as SpotifyAuthResponse

  if (!code || !state) {
    return res.status(400).json({ error: 'Authorization failed.' })
  }

  const cookieOptions = { path: '/' }
  res.setHeader('Set-Cookie', [
    serialize(COOKIE_KEYS.AUTH_CODE, code, cookieOptions),
    serialize(COOKIE_KEYS.AUTH_STATE, state, cookieOptions),
  ])

  return res.redirect('/')
}

export default handler
