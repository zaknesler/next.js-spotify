import Head from 'next/head'
import React from 'react'
import { RecentTracks } from '../../components/spotify/views/RecentTracks'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'

const RecentTracksPage: React.FC<{}> = () => {
  const { isAuthed } = useSpotifyAuthContext()

  if (!isAuthed()) return null

  return (
    <>
      <Head>
        <title>Recent Tracks</title>
      </Head>

      <RecentTracks />
    </>
  )
}

export default RecentTracksPage
