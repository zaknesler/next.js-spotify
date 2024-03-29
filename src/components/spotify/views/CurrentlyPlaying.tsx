import React from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../../utils/api/spotify/constants'
import type { Track } from '../../../utils/api/spotify/types'
import { spotifyFetcher } from '../../../utils/api/spotify/utils'
import { TrackItem } from '../TrackItem'

export type CurrentlyPlayingResponse = {
  timestamp: number
  progress_ms: number
  item: Track
  currently_playing_type: string
  is_playing: boolean
}

export const CurrentlyPlaying: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, isAuthed } = useSpotifyAuthContext()
  const { data } = useSWR<CurrentlyPlayingResponse>(
    isAuthed() ? [ENDPOINTS.ME.CURRENTLY_PLAYING, { auth }] : null,
    spotifyFetcher,
  )

  if (!isAuthed() || !data) return null

  return (
    <div className={className}>
      <TrackItem track={data.item} />
    </div>
  )
}
