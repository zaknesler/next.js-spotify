import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { ENDPOINTS } from '../utils/api/spotify/constants'
import {
  ProfileResponse,
  SpotifyAuthCookies,
  SpotifyAuthData,
  SpotifyContextData,
} from '../utils/api/spotify/types'
import {
  haveAuthScopesChanged,
  hasAccessTokenExpired,
  spotifyFetcher,
} from '../utils/api/spotify/utils'
import { SpotifyAuthContext } from '../utils/contexts/SpotifyAuthContext'
import { useCookies } from './useCookies'

export const useSpotifyAuthContext = () => useContext(SpotifyAuthContext)

const defaultAuthData: SpotifyAuthData = {
  isAuthenticated: false,
  session: null,
  user: null,
}

export const useSpotifyAuth = (): SpotifyContextData => {
  const router = useRouter()
  const cookies = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuthData>(defaultAuthData)

  const { data: user } = useSWR<ProfileResponse>(
    auth.isAuthenticated ? [ENDPOINTS.PROFILE, auth] : null,
    spotifyFetcher,
  )

  const invalidate = () => setAuth(defaultAuthData)

  const logout = async () =>
    await fetch('/api/auth/spotify/logout', { method: 'POST' })
      .then(invalidate)
      .catch(console.error)

  useEffect(() => {
    if (auth.session || user) return

    const isAuthenticated = Boolean(cookies?.spotify_access_token)
    setAuth({
      isAuthenticated,
      session: isAuthenticated
        ? {
            access_token: cookies.spotify_access_token,
            expires_at: new Date(cookies.spotify_expires_at * 1000),
            scopes: cookies.spotify_original_auth_scope.split(' '),
            state: cookies.spotify_state,
          }
        : null,
      user: user ?? null,
    })
  }, [cookies, auth.session, user])

  useEffect(() => {
    if (!auth) return

    if (
      auth.isAuthenticated &&
      hasAccessTokenExpired(auth.session.expires_at)
    ) {
      router.push('/api/auth/spotify/reauth')
      return
    }

    if (auth.isAuthenticated && haveAuthScopesChanged(auth.session.scopes)) {
      router.push('/api/auth/spotify/login')
      return
    }
  }, [auth, router])

  useEffect(() => console.log('useSpotifyAuth', auth))

  return { auth, user, invalidate, logout }
}
