import React from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../../utils/api/spotify/constants'
import type { Track } from '../../../utils/api/spotify/types'
import { spotifyFetcher } from '../../../utils/api/spotify/utils'
import { TrackItem } from '../TrackItem'

export type RecentTracksResponse = {
  items: {
    track: Track
    played_at: Date
  }[]
  limit: number
  offset: number
  total: number
  next: string
}

export const RecentTracks: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, isAuthed } = useSpotifyAuthContext()
  const { data, error } = useSWR<RecentTracksResponse>(
    isAuthed() ? [ENDPOINTS.ME.RECENTLY_PLAYED, { auth }] : null,
    spotifyFetcher,
  )

  if (!isAuthed()) return null
  if (!data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return (
    <div className={className}>
      <h3 className="w-full border-b-4 border-spotify-brand border-opacity-25 pb-1 font-semibold md:w-48">
        Recent tracks
      </h3>

      <div className="mt-3 space-y-3">
        {data.items &&
          data.items.map((item, iter) => (
            <TrackItem track={item.track} key={'recent-tracks.' + iter} />
          ))}
      </div>
    </div>
  )
}
