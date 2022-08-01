import React from 'react'
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth'
import useSWR from 'swr'
import { spotifyFetcher } from '../../utils/api/spotify/utils'

type SpotifyProfileResponse = {
  id: string
  email: string
  display_name: string
  product: 'premium' | 'free' | 'open'
}

export const SpotifyProfile: React.FC<{}> = () => {
  const { auth } = useSpotifyAuth()
  const { data, error } = useSWR<SpotifyProfileResponse>(
    auth?.isAuthenticated ? ['https://api.spotify.com/v1/me', auth] : null,
    spotifyFetcher,
  )

  if (!auth) return
  if (!data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return (
    <div>
      <h3 className="text-xl font-semibold">Hello, {data.display_name}!</h3>

      <p className="mt-2 max-w-sm leading-relaxed text-gray-600">
        You&apos;ve hooked up your Spotify account, nice!
      </p>
    </div>
  )
}
