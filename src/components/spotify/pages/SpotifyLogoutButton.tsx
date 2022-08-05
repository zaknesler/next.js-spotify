import { useRouter } from 'next/router'
import React from 'react'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'

export const SpotifyLogoutButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, logout, invalidate } = useSpotifyAuthContext()

  if (!auth?.isAuthenticated) return

  const handle = async () =>
    await logout().then(invalidate).catch(console.error)

  return (
    <div className={className}>
      <a
        href="#"
        onClick={handle}
        className="text-sm font-semibold text-[#1db954] hover:text-green-600 hover:underline"
      >
        Sign out
      </a>
    </div>
  )
}
