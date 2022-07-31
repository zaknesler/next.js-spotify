import { useEffect, useState } from 'react'
import { SpotifyAuthCookies } from '../utils/api/spotify/types'
import { useCookies } from './useCookies'

type SpotifyAuth = {
  authUrl: string
  isAuthenticated: boolean
  user: null | {
    access_token: string
    refresh_token: string
    expires_at: Date
    scopes: Array<string>
    state: string
  }
}

export const useSpotifyAuth = () => {
  const cookies = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuth>(null)

  useEffect(() => {
    if (!cookies) return

    const isAuthenticated = Boolean(cookies.spotify_access_token)
    setAuth({
      authUrl: '/api/auth/spotify/login',
      isAuthenticated: isAuthenticated,
      user: isAuthenticated
        ? {
            access_token: cookies.spotify_access_token,
            refresh_token: cookies.spotify_refresh_token,
            expires_at: new Date(cookies.spotify_expires_at),
            scopes: cookies.spotify_original_auth_scope?.split(' '),
            state: cookies.spotify_state,
          }
        : null,
    })
  }, [cookies])

  return auth
}
