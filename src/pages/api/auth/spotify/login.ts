import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_SCOPES, AUTH_URL } from '../../../../utils/api/spotify/constants'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(
    AUTH_URL +
      '?' +
      new URLSearchParams({
        response_type: 'code',
        scope: AUTH_SCOPES.join(' '),
        state: '1234567812345678',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      }),
  )
}

export default handler
