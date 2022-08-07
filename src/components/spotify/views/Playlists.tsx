import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../../utils/api/spotify/constants'
import type { Playlist } from '../../../utils/api/spotify/types'
import { spotifyFetcher } from '../../../utils/api/spotify/utils'

export type PlaylistsResponse = {
  items: Playlist[]
  limit: number
  offset: number
  total: number
  previous: string
  next: string
  href: string
}

export const Playlists: React.FC<{ className?: string }> = ({ className }) => {
  const { auth, user, isAuthed } = useSpotifyAuthContext()
  const [offset, setOffset] = useState(0)
  const { data, error } = useSWR<PlaylistsResponse>(
    isAuthed() && !!user
      ? [`${ENDPOINTS.USERS.PLAYLISTS(user.id)}?offset=${offset}`, auth]
      : null,
    spotifyFetcher,
  )

  useEffect(() => data && setOffset(data.offset), [data])

  if (!isAuthed()) return
  if (!data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  const hasMoreItems = () => data.offset + data.limit < data.total

  return (
    <div className={className}>
      <h3 className="w-full border-b-4 border-spotify-brand border-opacity-25 pb-1 font-semibold md:w-48">
        Your playlists{' '}
        {hasMoreItems() && (
          <button onClick={() => setOffset(v => (v += data.limit))}>
            ({offset})
          </button>
        )}
      </h3>

      <ul className="mt-3 space-y-3">
        {data?.items.map(playlist => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  )
}
