import React from 'react'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'

export const SpotifyLogoutButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, logout } = useSpotifyAuthContext()

  if (!auth?.isAuthenticated) return

  return (
    <div className={className}>
      <a
        href="#"
        onClick={logout}
        className="text-sm font-semibold text-[#1db954] hover:text-green-600 hover:underline"
      >
        Sign out
      </a>
    </div>
  )
}
