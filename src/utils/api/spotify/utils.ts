import dayjs from 'dayjs'
import { NextApiRequest } from 'next'
import { formatCookie } from '../..'
import { error } from '../../logger'
import { AUTH_SCOPES, COOKIE_KEYS } from './constants'
import type { SpotifyAuthData } from './types'

export const spotifyFetcher = (
  input: RequestInfo | URL,
  init: { auth: SpotifyAuthData | null } & RequestInit,
): Promise<Response> | any => {
  if (!init.auth) return null
  if (!init.auth.isAuthenticated || !init.auth.session) return null

  return fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${init.auth.session.access_token}`,
    },
  })
    .then(res => res.json())
    .catch(error)
}

export const getBase64AuthString = () =>
  Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64')

export const getRedirectURL = (req: NextApiRequest) =>
  process.env.SPOTIFY_REDIRECT_URI ||
  `https://${req.headers.host}/api/auth/spotify/callback`

export const formatAuthCookies = (data: {
  access_token?: string
  refresh_token?: string
  scope?: string
  state?: string
  expires_in?: number
}): string[] =>
  [
    formatCookie(COOKIE_KEYS.ACCESS_TOKEN, data.access_token),
    formatCookie(COOKIE_KEYS.REFRESH_TOKEN, data.refresh_token, {
      httpOnly: true,
    }),
    formatCookie(COOKIE_KEYS.SCOPE, data.scope),
    formatCookie(COOKIE_KEYS.STATE, data.state),
    formatCookie(
      COOKIE_KEYS.EXPIRES_AT,
      Number(data.expires_in)
        ? dayjs().add(Number(data.expires_in), 'second').toISOString()
        : null,
    ),
  ].filter(Boolean) as string[]

export const hasAccessTokenExpired = (expires_at: dayjs.ConfigType) =>
  dayjs().isAfter(dayjs(expires_at))

export const haveAuthScopesChanged = (scopes: string[]) =>
  !AUTH_SCOPES.every(scope => scopes.includes(scope))
