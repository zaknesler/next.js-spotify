import Head from 'next/head'
import React from 'react'
import { Playlists } from '../../components/spotify/views/Playlists'
import { useSpotifyAuthContext } from '../../hooks/useSpotifyAuth'

const PlaylistsPage: React.FC<{}> = () => {
  const { isAuthed } = useSpotifyAuthContext()

  if (!isAuthed()) return

  return (
    <>
      <Head>
        <title>Your playlists</title>
      </Head>

      <main>
        <Playlists />
      </main>
    </>
  )
}

export default PlaylistsPage
