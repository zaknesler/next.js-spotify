import React from 'react'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'

export const LogoutButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isAuthed, logout } = useSpotifyAuthContext()

  if (!isAuthed()) return null

  return (
    <div className={className}>
      <a
        onClick={logout}
        className="cursor-pointer text-sm font-semibold text-spotify-text hover:underline"
      >
        Sign out
      </a>
    </div>
  )
}
