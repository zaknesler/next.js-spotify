import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { ENDPOINTS } from '../utils/api/spotify/constants'
import {
  SpotifyAuthCookies,
  SpotifyAuthData,
  SpotifyContextData,
  SpotifyUserData,
} from '../utils/api/spotify/types'
import {
  haveAuthScopesChanged,
  hasAccessTokenExpired,
  spotifyFetcher,
} from '../utils/api/spotify/utils'
import { SpotifyAuthContext } from '../utils/contexts/SpotifyAuthContext'
import { useCookies } from './useCookies'

export const useSpotifyAuthContext = () => useContext(SpotifyAuthContext)

export const useSpotifyAuth = (): SpotifyContextData => {
  const router = useRouter()
  const { cookies, clearCookies } = useCookies<SpotifyAuthCookies>()
  const [auth, setAuth] = useState<SpotifyAuthData>(null)

  const isAuthed = () =>
    auth &&
    cookies &&
    auth.isAuthenticated &&
    Boolean(auth.session) &&
    !hasAccessTokenExpired(auth.session.expires_at) &&
    !haveAuthScopesChanged(auth.session.scopes)

  const invalidate = () => {
    setAuth(null)
    clearCookies()
  }

  const logout = () =>
    fetch('/api/auth/spotify/logout', { method: 'POST' }).then(invalidate)

  const { data: user } = useSWR<SpotifyUserData>(
    isAuthed() ? [ENDPOINTS.ME.PROFILE, { auth }] : null,
    spotifyFetcher,
  )

  useEffect(() => {
    if (auth?.session || user) return

    const isAuthenticated = Boolean(cookies?.spotify_access_token)
    setAuth({
      isAuthenticated,
      session: isAuthenticated
        ? {
            access_token: cookies.spotify_access_token,
            expires_at: dayjs(cookies.spotify_expires_at).toDate(),
            scopes: cookies.spotify_original_auth_scope.split(' '),
            state: cookies.spotify_state,
          }
        : null,
      user: user ?? null,
    })
  }, [cookies, auth?.session, user])

  useEffect(() => {
    if (!auth?.isAuthenticated) return

    if (hasAccessTokenExpired(auth.session.expires_at)) {
      router.push('/api/auth/spotify/reauth')
      return
    }

    if (haveAuthScopesChanged(auth.session.scopes)) {
      router.push('/api/auth/spotify/login')
      return
    }
  }, [auth, router])

  return { auth, setAuth, user, invalidate, logout, isAuthed }
}
