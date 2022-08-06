import { readSync } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_SCOPES, AUTH_URL } from '../../../../utils/api/spotify/constants'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const params = new URLSearchParams({
    response_type: 'code',
    scope: AUTH_SCOPES.join(' '),
    state: '1234567812345678', // @todo generate a random string on session start
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri:
      process.env.SPOTIFY_REDIRECT_URI ||
      `https://${req.headers.host}/api/auth/spotify/callback`,
  })

  res.redirect(`${AUTH_URL}?${params}`)
}

export default handler
