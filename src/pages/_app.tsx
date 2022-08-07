import 'tailwindcss/tailwind.css'
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
        <div className="flex flex-col gap-8 p-8 md:flex-row md:gap-12 md:p-12">
          <Sidebar className="top-0 left-0 right-0 w-full md:sticky md:max-w-xs" />
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </SpotifyAuthContext.Provider>
  )
}

export default App
