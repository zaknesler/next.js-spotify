import type { NextApiRequest, NextApiResponse } from 'next'
import { ACCESS_TOKEN_URL } from '../../../../utils/api/spotify/constants'
import { SpotifyAuthCookies } from '../../../../utils/api/spotify/types'
import {
  formatAuthCookies,
  isAccessTokenExpired,
} from '../../../../utils/api/spotify/utils'

type SpotifyRefreshTokenResponse = {
  access_token: string
  token_type: string
  scope: string
  expires_in: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { spotify_refresh_token, spotify_expires_at } =
    req.cookies as SpotifyAuthCookies

  if (!isAccessTokenExpired(new Date(spotify_expires_at * 1000))) {
    // No need to reauth
    return res.redirect('/')
  }

  const authString = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  const data: SpotifyRefreshTokenResponse = await fetch(ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(authString).toString('base64'),
    },
    body: new URLSearchParams({
      refresh_token: spotify_refresh_token,
      grant_type: 'refresh_token',
    }),
  })
    .then(data => data.json())
    .catch(console.log)

  res.setHeader(
    'Set-Cookie',
    formatAuthCookies({
      access_token: data.access_token,
      expires_in: data.expires_in,
    }),
  )

  return res.redirect('/')
}

export default handler
