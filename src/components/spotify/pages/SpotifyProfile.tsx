import React from 'react'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'

export const SpotifyProfile: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { user } = useSpotifyAuthContext()

  if (!user) return

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold">Hello, {user.display_name}!</h3>

      <p className="mt-2 max-w-sm leading-relaxed text-gray-600">
        You&apos;ve connected your Spotify account. Nice!
      </p>
    </div>
  )
}
