import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_SCOPES, AUTH_URL } from '../../../../utils/api/spotify/constants'
import { getRedirectURL } from '../../../../utils/api/spotify/utils'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method not allowed' })

  const params = new URLSearchParams({
    response_type: 'code',
    scope: AUTH_SCOPES.join(' '),
    state: '1234567812345678', // @todo generate a random string on session start
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: getRedirectURL(req),
  })

  res.redirect(`${AUTH_URL}?${params}`)
}

export default handler
