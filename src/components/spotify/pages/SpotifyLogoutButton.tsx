import React from 'react'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'

export const SpotifyLogoutButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isAuthed, logout } = useSpotifyAuthContext()

  if (!isAuthed()) return

  return (
    <div className={className}>
      <a
        href="#"
        onClick={logout}
        className="text-sm font-semibold text-spotify-text hover:underline"
      >
        Sign out
      </a>
    </div>
  )
}
