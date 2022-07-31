import type { NextApiRequest, NextApiResponse } from 'next'
import { ACCESS_TOKEN_URL } from '../../../../utils/api/spotify/constants'
import { formatAuthCookies } from '../../../../utils/api/spotify/utils'

type SpotifyAuthResponse = {
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { state, code, error } = req.query as SpotifyAuthResponse

  if (error) return res.status(400).json({ error })
  if (!code) return res.status(400).json({ error: 'Authorization failed.' })

  const authString = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  const data: SpotifyAccessTokenResponse = await fetch(ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(authString).toString('base64'),
    },
    body: new URLSearchParams({
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  })
    .then(data => data.json())
    .catch(console.log)

  res.setHeader('Set-Cookie', formatAuthCookies({ ...data, state }))

  return res.redirect('/')
}

export default handler
