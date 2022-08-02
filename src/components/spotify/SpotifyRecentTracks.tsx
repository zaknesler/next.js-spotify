import React from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../utils/api/spotify/constants'
import type { Track } from '../../utils/api/spotify/types'
import { spotifyFetcher } from '../../utils/api/spotify/utils'

type SpotifyRecentTracksResponse = {
  items: {
    track: Track
    played_at: Date
  }[]
  limit: number
  offset: number
  total: number
  next: string
}

export const SpotifyRecentTracks: React.FC<{}> = () => {
  const { auth } = useSpotifyAuthContext()
  const { data, error } = useSWR<SpotifyRecentTracksResponse>(
    auth?.isAuthenticated ? [ENDPOINTS.RECENTLY_PLAYED, auth] : null,
    spotifyFetcher,
  )

  if (!auth?.isAuthenticated) return
  if (!data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return (
    <div>
      <h3 className="w-48 border-b-4 border-[#1db954] border-opacity-25 pb-1 font-semibold">
        Recent tracks
      </h3>

      <ul className="mt-3 ml-6 list-disc space-y-3">
        {data.items &&
          data.items.map((item, iter) => (
            <li key={iter}>
              <div className="font-medium">{item.track.name}</div>
              <div className="text-sm text-gray-600">
                {item.track.artists[0].name}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
