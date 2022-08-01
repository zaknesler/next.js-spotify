import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import {
  SpotifyAuthCookies,
  SpotifyAuthData,
  SpotifyContextData,
} from '../utils/api/spotify/types'
import {
  haveAuthScopesChanged,
  isAccessTokenExpired,
} from '../utils/api/spotify/utils'
import { SpotifyAuthContext } from '../utils/contexts/SpotifyAuthContext'
import { useCookies } from './useCookies'

export const useSpotifyAuth = () => useContext(SpotifyAuthContext)

export const SpotifyAuth = (): SpotifyContextData => {
  const router = useRouter()
  const cookies = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuthData>(null)
  const invalidate = () => setAuth({ isAuthenticated: false, user: null })

  useEffect(() => {
    if (!cookies) return

    const isAuthenticated = Boolean(cookies?.spotify_access_token)
    const user = isAuthenticated
      ? {
          access_token: cookies.spotify_access_token,
          expires_at: new Date(cookies.spotify_expires_at * 1000),
          scopes: cookies.spotify_original_auth_scope.split(' '),
          state: cookies.spotify_state,
        }
      : null

    if (isAuthenticated && isAccessTokenExpired(user.expires_at)) {
      router.push('/api/auth/spotify/reauth')
    }

    if (isAuthenticated && haveAuthScopesChanged(user.scopes)) {
      router.push('/api/auth/spotify/login')
    }

    setAuth({ isAuthenticated, user })
  }, [cookies, router])

  return { auth, invalidate }
}
