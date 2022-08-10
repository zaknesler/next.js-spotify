import type { NextApiRequest, NextApiResponse } from 'next'
import { ACCESS_TOKEN_URL } from '../../../../utils/api/spotify/constants'
import { SpotifyAuthCookies } from '../../../../utils/api/spotify/types'
import {
  formatAuthCookies,
  getBase64AuthString,
  getRedirectURL,
} from '../../../../utils/api/spotify/utils'
import { ERROR_MESSAGES } from '../../../../utils/errors'

type CallbackRequestQueryParams = {
  state: string
  code?: string
  error?: string
}

type SpotifyAccessTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

type CallbackRequestExpectedCookies = Pick<SpotifyAuthCookies, 'spotify_state'>

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { state, code, error } = req.query as CallbackRequestQueryParams
  const { spotify_state } = req.cookies as any as CallbackRequestExpectedCookies

  if (error) return res.status(400).json({ error })
  if (!state || state !== spotify_state)
    return res.status(400).json({ error: ERROR_MESSAGES.STATE_MISMATCH })
  if (!code) return res.status(400).json({ error: ERROR_MESSAGES.AUTH_FAILED })

  const data: SpotifyAccessTokenResponse = await fetch(ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + getBase64AuthString(),
    },
    body: new URLSearchParams({
      code,
      redirect_uri: getRedirectURL(req),
      grant_type: 'authorization_code',
    }),
  })
    .then(data => data.json())
    .catch(console.log)

  res.setHeader('Set-Cookie', formatAuthCookies({ ...data, state }))

  return res.redirect('/')
}

export default handler
