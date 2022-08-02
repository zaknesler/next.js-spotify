import Link from 'next/link'
import React from 'react'
import { SpotifyLogo } from '../../assets/icons/spotify'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'

export const SpotifyLoginButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, logout } = useSpotifyAuthContext()

  if (!auth) return

  if (auth.isAuthenticated)
    return (
      <div className="mb-3">
        <a
          href="#"
          onClick={logout}
          className="text-sm font-semibold text-[#1db954] hover:text-green-600 hover:underline"
        >
          Sign out
        </a>
      </div>
    )

  return (
    <div className={className}>
      <Link href="/api/auth/spotify/login">
        <a className="flex items-center gap-2 rounded-lg bg-[#1db954] px-4 py-3 font-medium text-white no-underline shadow-sm hover:bg-green-600 sm:inline-flex">
          <SpotifyLogo className="h-6 w-6" color="white" />
          <span>Connect Spotify Account</span>
        </a>
      </Link>
    </div>
  )
}
