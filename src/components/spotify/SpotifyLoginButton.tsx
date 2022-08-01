import React from 'react'
import { SpotifyLogo } from '../../assets/icons/spotify'
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth'
import Link from 'next/link'

export const SpotifyLoginButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const auth = useSpotifyAuth()

  if (!auth) return <div>Loading...</div>

  return (
    !auth.isAuthenticated && (
      <div className={className}>
        <Link href="/api/auth/spotify/login">
          <a className="inline-flex items-center gap-2 rounded-lg bg-[#1db954] px-4 py-3 font-medium text-white no-underline hover:bg-green-600">
            <SpotifyLogo className="h-6 w-6" color="white" />
            <span>Sign in with Spotify</span>
          </a>
        </Link>
      </div>
    )
  )
}
