import Head from 'next/head'
import { SpotifyListPlaylists } from '../components/spotify/pages/SpotifyListPlaylists'
import { SpotifyTopTracks } from '../components/spotify/pages/SpotifyTopTracks'
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <SpotifyTopTracks />
            <SpotifyListPlaylists />
          </div>
        )}
      </main>
    </>
  )
}

export default IndexPage
