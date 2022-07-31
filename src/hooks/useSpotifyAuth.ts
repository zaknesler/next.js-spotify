import { useEffect, useState } from 'react'
import { SpotifyAuthCookies } from '../utils/api/spotify/types'
import { useCookies } from './useCookies'

type SpotifyAuth = {
  authUrl: string
  isAuthenticated: boolean
  user: {
    code?: string
    state?: string
  }
}

export const useSpotifyAuth = () => {
  const cookies = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuth>(null)

  useEffect(() => {
    if (!cookies) return

    setAuth({
      authUrl: '/api/auth/spotify/login',
      isAuthenticated: Boolean(cookies.spotify_auth_code),
      user: {
        code: cookies.spotify_auth_code ?? null,
        state: cookies.spotify_auth_state ?? null,
      },
    })
  }, [cookies])

  return auth
}
