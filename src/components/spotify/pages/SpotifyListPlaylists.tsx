import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useSpotifyAuthContext } from '../../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../../utils/api/spotify/constants'
import type { Playlist } from '../../../utils/api/spotify/types'
import { spotifyFetcher } from '../../../utils/api/spotify/utils'

type SpotifyListPlaylistsResponse = {
  items: Playlist[]
  limit: number
  offset: number
  total: number
  previous: string
  next: string
  href: string
}

export const SpotifyListPlaylists: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { auth, user, isAuthed } = useSpotifyAuthContext()
  const [offset, setOffset] = useState(0)
  const { data, error } = useSWR<SpotifyListPlaylistsResponse>(
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
      <h3 className="w-full border-b-4 border-[#1db954] border-opacity-25 pb-1 font-semibold sm:w-48">
        Your playlists{' '}
        {hasMoreItems() && (
          <button onClick={() => setOffset(v => (v += data.limit))}>
            ({offset})
          </button>
        )}
      </h3>

      <ul className="mt-3 space-y-3">
        {data.items.map(playlist => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  )
}