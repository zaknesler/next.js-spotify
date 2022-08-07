import Link from 'next/link'
import React from 'react'
import { SpotifyLogo } from '../../assets/icons/spotify'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'

export const LoginButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isAuthed } = useSpotifyAuthContext()

  if (isAuthed()) return

  return (
    <div className={className}>
      <Link href="/api/auth/spotify/login">
        <a className="flex items-center justify-center gap-2 rounded-lg bg-spotify-brand px-4 py-4 font-medium text-white no-underline shadow-lg shadow-green-200 ring-spotify-brand ring-opacity-40 transition-shadow hover:bg-green-600 focus:outline-none focus:ring-4 md:py-3">
          <SpotifyLogo className="h-6 w-6" color="white" />
          <span>Connect Spotify Account</span>
        </a>
      </Link>
    </div>
  )
}
