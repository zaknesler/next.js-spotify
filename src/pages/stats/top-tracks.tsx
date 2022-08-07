import Head from 'next/head'
import React from 'react'
import { TopTracks } from '../../components/spotify/views/TopTracks'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'

const TopTracksPage: React.FC<{}> = () => {
  const { isAuthed } = useSpotifyAuthContext()

  if (!isAuthed()) return

  return (
    <>
      <Head>
        <title>Top Tracks</title>
      </Head>

      <main>
        <TopTracks />
      </main>
    </>
  )
}

export default TopTracksPage
