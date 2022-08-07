import Head from 'next/head'
import { Playlists } from '../components/spotify/views/Playlists'
import { RecentTracks } from '../components/spotify/views/RecentTracks'
import { TopTracks } from '../components/spotify/views/TopTracks'
import { useSpotifyAuthContext } from '../hooks/useSpotifyAuth'

const IndexPage = () => {
  const { isAuthed } = useSpotifyAuthContext()

  return (
    <>
      <Head>
        <title>Next.js + Spotify</title>
      </Head>

      <main>
        {isAuthed() && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <TopTracks />
            <RecentTracks />
            <Playlists />
          </div>
        )}
      </main>
    </>
  )
}

export default IndexPage
