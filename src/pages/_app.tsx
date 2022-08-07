import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { SWRConfig } from 'swr'
import { SpotifyCurrentlyPlaying } from '../components/spotify/pages/SpotifyCurrentlyPlaying'
import { SpotifyLoginButton } from '../components/spotify/pages/SpotifyLoginButton'
import { SpotifyLogoutButton } from '../components/spotify/pages/SpotifyLogoutButton'
import { SpotifyProfile } from '../components/spotify/pages/SpotifyProfile'
import { useSpotifyAuth } from '../hooks/useSpotifyAuth'
import { SpotifyAuthContext } from '../utils/contexts/SpotifyAuthContext'
import { fetcher } from '../utils/fetcher'
import '../assets/css/app.css'

const App = ({ Component, pageProps }: AppProps) => {
  const auth = useSpotifyAuth()

  return (
    <SpotifyAuthContext.Provider value={auth}>
      <Head>
        <title>Spotify</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRConfig value={{ fetcher }}>
        <div className="flex flex-col gap-6 p-8 md:flex-row md:p-12">
          <div className="top-0 w-full md:sticky md:max-w-xs">
            {auth.isAuthed() ? (
              <>
                <SpotifyLogoutButton />
                <SpotifyProfile className="mt-2" />
                <SpotifyCurrentlyPlaying className="mt-6 md:max-w-sm" />

                <div className="my-6 h-1 w-1/2 bg-gray-200"></div>

                <div className="space-y-2 text-lg font-semibold text-black ">
                  <div>
                    <Link href="/">
                      <a className="hover:text-spotify-text">Home</a>
                    </Link>
                  </div>

                  <div>
                    <Link href="/stats/recent-tracks">
                      <a className="hover:text-spotify-text">Recent Tracks</a>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">Welcome.</h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  Sign in with your Spotify account to continue.
                </p>
                <SpotifyLoginButton className="mt-6" />
              </>
            )}
          </div>
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </SpotifyAuthContext.Provider>
  )
}

export default App
