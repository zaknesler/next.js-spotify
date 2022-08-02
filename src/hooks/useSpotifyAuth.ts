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
  isAccessTokenExpired,
  spotifyFetcher,
} from '../utils/api/spotify/utils'
import { SpotifyAuthContext } from '../utils/contexts/SpotifyAuthContext'
import { useCookies } from './useCookies'

export const useSpotifyAuthContext = () => useContext(SpotifyAuthContext)

export const useSpotifyAuth = (): SpotifyContextData => {
  const router = useRouter()
  const cookies = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuthData>({
    isAuthenticated: false,
    session: null,
    user: null,
  })

  const { data: user, mutate } = useSWR<ProfileResponse>(
    auth.isAuthenticated ? [ENDPOINTS.PROFILE, auth] : null,
    spotifyFetcher,
  )

  const invalidate = () =>
    setAuth({
      isAuthenticated: false,
      session: null,
      user: null,
    })

  const logout = async () =>
    await fetch('/api/auth/spotify/logout', { method: 'POST' })
      .catch(console.log)
      .then(invalidate)
      .then(() => mutate())

  const checkAuth = useCallback(() => {
    if (auth.session) return

    const isAuthenticated = Boolean(cookies?.spotify_access_token)
    const session = isAuthenticated
      ? {
          access_token: cookies.spotify_access_token,
          expires_at: new Date(cookies.spotify_expires_at * 1000),
          scopes: cookies.spotify_original_auth_scope.split(' '),
          state: cookies.spotify_state,
        }
      : null

    setAuth({ isAuthenticated, session: session, user: user ?? null })
  }, [auth.session, cookies, user])

  useEffect(() => {
    if (auth.isAuthenticated && isAccessTokenExpired(auth.session.expires_at)) {
      router.replace('/api/auth/spotify/reauth')
      return
    }

    if (auth.isAuthenticated && haveAuthScopesChanged(auth.session.scopes)) {
      router.replace('/api/auth/spotify/login')
      return
    }
  }, [auth, router])

  useEffect(() => {
    if (!cookies) return
    checkAuth()
  }, [cookies, checkAuth])

  return { auth, user, invalidate, logout }
}
