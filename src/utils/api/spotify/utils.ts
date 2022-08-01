import { formatCookie } from '../..'
import { AUTH_SCOPES, COOKIE_KEYS } from './constants'
import type { SpotifyAuthData } from './types'

export const spotifyFetcher = (
  input: RequestInfo | URL,
  init: SpotifyAuthData,
): Promise<Response> | any => {
  if (!init.isAuthenticated) return null
  return fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${init.user.access_token}`,
    },
  }).then(res => res.json())
}

export const formatAuthCookies = (data: {
  access_token?: string
  refresh_token?: string
  scope?: string
  state?: string
  expires_in?: number
}) =>
  [
    formatCookie(COOKIE_KEYS.ACCESS_TOKEN, data.access_token),
    formatCookie(COOKIE_KEYS.REFRESH_TOKEN, data.refresh_token, {
      httpOnly: true,
    }),
    formatCookie(COOKIE_KEYS.SCOPE, data.scope),
    formatCookie(COOKIE_KEYS.STATE, data.state),
    formatCookie(
      COOKIE_KEYS.EXPIRES_AT,
      String(Math.floor(new Date().valueOf() / 1000) + data.expires_in),
    ),
  ].filter(Boolean)

export const isAccessTokenExpired = token =>
  new Date().valueOf() >= token.valueOf()

export const haveAuthScopesChanged = (scopes: string[]) =>
  !AUTH_SCOPES.every(scope => scopes.includes(scope))
