import Head from 'next/head'
import { SpotifyLoginButton } from '../components/spotify/SpotifyLoginButton'
import { SpotifyLogoutButton } from '../components/spotify/SpotifyLogoutButton'
import { SpotifyProfile } from '../components/spotify/SpotifyProfile'
import { SpotifyTopTracks } from '../components/spotify/SpotifyTopTracks'
import { useSpotifyAuth } from '../hooks/useSpotifyAuth'

export default function Index() {
  const { auth } = useSpotifyAuth()

  return (
    <>
      <Head>
        <title>Next.js + Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8 sm:p-12">
        {auth?.isAuthenticated ? (
          <>
            <SpotifyLogoutButton />
            <div className="mt-2 space-y-6">
              <SpotifyProfile />
              <SpotifyTopTracks />
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold">Welcome.</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-gray-600">
              Sign in with your Spotify account to continue.
            </p>
            <SpotifyLoginButton className="mt-6" />
          </>
        )}
      </main>
    </>
  )
}
