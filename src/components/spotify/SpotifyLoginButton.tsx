import React from 'react'
import { SpotifyLogo } from '../../assets/icons/spotify'
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth'
import Link from 'next/link'

export const SpotifyLoginButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, invalidate } = useSpotifyAuth()
  if (!auth) return

  const logout = async () =>
    await fetch('/api/auth/spotify/logout', { method: 'POST' })
      .catch(console.log)
      .then(invalidate)

  if (auth.isAuthenticated)
    return (
      <div className="mb-3">
        <a
          href="#"
          onClick={logout}
          className="text-sm font-semibold text-[#1db954] hover:text-green-600 hover:underline"
        >
          Logout
        </a>
      </div>
    )

  return (
    <div className={className}>
      <Link href="/api/auth/spotify/login">
        <a className="inline-flex items-center gap-2 rounded-lg bg-[#1db954] px-4 py-3 font-medium text-white no-underline hover:bg-green-600">
          <SpotifyLogo className="h-6 w-6" color="white" />
          <span>Sign in with Spotify</span>
        </a>
      </Link>
    </div>
  )
}
