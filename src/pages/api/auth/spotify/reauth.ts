import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ACCESS_TOKEN_URL } from '../../../../utils/api/spotify/constants'
import { SpotifyAuthCookies } from '../../../../utils/api/spotify/types'
import {
  formatAuthCookies,
  getBase64AuthString,
  hasAccessTokenExpired,
} from '../../../../utils/api/spotify/utils'
import { ERROR_MESSAGES } from '../../../../utils/errors'

type SpotifyRefreshTokenResponse = {
  access_token: string
  token_type: string
  scope: string
  expires_in: number
}

type ReauthRequestExpectedCookies = Pick<
  SpotifyAuthCookies,
  'spotify_refresh_token' | 'spotify_expires_at'
>

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { spotify_refresh_token, spotify_expires_at } =
    req.cookies as any as ReauthRequestExpectedCookies

  if (!spotify_refresh_token || !spotify_expires_at)
    return res.status(400).json({ error: ERROR_MESSAGES.QUERY_PARAMS_MISSING })
  if (!hasAccessTokenExpired(spotify_expires_at)) return res.redirect('/')

  const data: SpotifyRefreshTokenResponse = await fetch(ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + getBase64AuthString(),
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
