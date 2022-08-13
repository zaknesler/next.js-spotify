import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { Sidebar } from '../components/Sidebar'
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
        <div className="flex flex-col overflow-hidden md:h-full md:w-full md:flex-row">
          <Sidebar className="w-full flex-shrink-0 p-8 pb-0 md:max-w-xs md:pb-8 md:pr-4" />
          <main className="flex-1 overflow-y-auto p-8 md:pt-8 md:pl-4">
            <Component {...pageProps} />
          </main>
        </div>
      </SWRConfig>
    </SpotifyAuthContext.Provider>
  )
}

export default App
