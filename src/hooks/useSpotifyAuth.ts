import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SpotifyAuthCookies } from '../utils/api/spotify/types'
import { isAccessTokenExpired } from '../utils/api/spotify/utils'
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
  const router = useRouter()
  const cookies = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuth>(null)

  useEffect(() => {
    if (!cookies) return

    const isAuthenticated = Boolean(cookies.spotify_access_token)
    const tokenExpiration = new Date(cookies.spotify_expires_at * 1000)

    if (isAuthenticated && isAccessTokenExpired(tokenExpiration)) {
      console.log('Need to reauth!')
      router.push('/api/auth/spotify/reauth')
    }

    setAuth({
      authUrl: '/api/auth/spotify/login',
      isAuthenticated: isAuthenticated,
      user: isAuthenticated
        ? {
            access_token: cookies.spotify_access_token,
            refresh_token: cookies.spotify_refresh_token,
            expires_at: tokenExpiration,
            scopes: cookies.spotify_original_auth_scope?.split(' '),
            state: cookies.spotify_state,
          }
        : null,
    })
  }, [cookies, router])

  return auth
}
