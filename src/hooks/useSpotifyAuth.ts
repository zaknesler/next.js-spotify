import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SpotifyAuthCookies, SpotifyAuthData } from '../utils/api/spotify/types'
import {
  haveAuthScopesChanged,
  isAccessTokenExpired,
} from '../utils/api/spotify/utils'
import { SpotifyAuthContext } from '../utils/SpotifyAuthContext'
import { useCookies } from './useCookies'

export const useSpotifyAuthContext = () => useContext(SpotifyAuthContext)

export const useSpotifyAuth = (): SpotifyAuthData => {
  const router = useRouter()
  const cookies = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuthData>(null)

  useEffect(() => {
    if (!cookies) return

    const isAuthenticated = Boolean(cookies.spotify_access_token)
    const user = {
      access_token: cookies.spotify_access_token,
      expires_at: new Date(cookies.spotify_expires_at * 1000),
      scopes: cookies.spotify_original_auth_scope.split(' '),
      state: cookies.spotify_state,
    }

    if (isAuthenticated && isAccessTokenExpired(user.expires_at)) {
      router.push('/api/auth/spotify/reauth')
    }

    if (isAuthenticated && haveAuthScopesChanged(user.scopes)) {
      router.push('/api/auth/spotify/login')
    }

    setAuth({ isAuthenticated, user: isAuthenticated ? user : null })
  }, [cookies, router])

  return auth
}
