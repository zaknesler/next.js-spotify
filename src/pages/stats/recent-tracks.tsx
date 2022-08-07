import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'
import { TrackItem } from '../../components/spotify/TrackItem'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'
import { ENDPOINTS } from '../../utils/api/spotify/constants'
import type { Track } from '../../utils/api/spotify/types'
import { spotifyFetcher } from '../../utils/api/spotify/utils'

type RecentTracksResponse = {
  items: {
    track: Track
    played_at: Date
  }[]
  limit: number
  offset: number
  total: number
  next: string
}

const RecentTracksPage: React.FC<{}> = () => {
  const { auth, isAuthed } = useSpotifyAuthContext()
  const { data, error } = useSWR<RecentTracksResponse>(
    isAuthed() ? [ENDPOINTS.ME.RECENTLY_PLAYED, auth] : null,
    spotifyFetcher,
  )

  if (!isAuthed()) return
  if (!data) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return (
    <>
      <Head>
        <title>Recent Tracks</title>
      </Head>

      <main>
        <h3 className="w-full border-b-4 border-spotify-brand border-opacity-25 pb-1 font-semibold md:w-48">
          Recent tracks
        </h3>

        <div className="mt-3 space-y-3">
          {data.items &&
            data.items.map((item, iter) => (
              <TrackItem track={item.track} key={'recent-tracks.' + iter} />
            ))}
        </div>
      </main>
    </>
  )
}

export default RecentTracksPage
