import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_SCOPES, AUTH_URL } from '../../../../utils/api/spotify/constants'
import type { SpotifyAuthCookies } from '../../../../utils/api/spotify/types'
import { getRedirectURL } from '../../../../utils/api/spotify/utils'

type SetStateRequestExpectedCookies = Pick<SpotifyAuthCookies, 'spotify_state'>

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { spotify_state } = req.cookies as any as SetStateRequestExpectedCookies

  if (!spotify_state)
    return res.redirect('/api/auth/spotify/init?redirect=login')

  const params = new URLSearchParams({
    response_type: 'code',
    scope: AUTH_SCOPES.join(' '),
    state: spotify_state,
    client_id: process.env.SPOTIFY_CLIENT_ID || '',
    redirect_uri: getRedirectURL(req),
  })

  res.redirect(`${AUTH_URL}?${params}`)
}

export default handler
