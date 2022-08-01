import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SpotifyAuthCookies } from '../utils/api/spotify/types'
import {
  haveAuthScopesChanged,
  isAccessTokenExpired,
} from '../utils/api/spotify/utils'
import { useCookies } from './useCookies'

export type SpotifyAuthData = {
  isAuthenticated: boolean
  user: null | {
    access_token: string
    refresh_token: string
    expires_at: Date
    scopes: Array<string>
    state: string
  }
}

export const useSpotifyAuth = (): SpotifyAuthData => {
  const router = useRouter()
  const cookies = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuthData>(null)

  useEffect(() => {
    if (!cookies) return

    const isAuthenticated = Boolean(cookies.spotify_access_token)
    const authNew = {
      isAuthenticated: isAuthenticated,
      user: isAuthenticated
        ? {
            access_token: cookies.spotify_access_token,
            refresh_token: cookies.spotify_refresh_token,
            expires_at: new Date(cookies.spotify_expires_at * 1000),
            scopes: cookies.spotify_original_auth_scope.split(' '),
            state: cookies.spotify_state,
          }
        : null,
    }

    if (isAuthenticated && isAccessTokenExpired(authNew.user.expires_at)) {
      router.push('/api/auth/spotify/reauth')
    }

    if (isAuthenticated && haveAuthScopesChanged(authNew.user.scopes)) {
      router.push('/api/auth/spotify/login')
    }

    setAuth(authNew)
  }, [cookies, router])

  return auth
}
