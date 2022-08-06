import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
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
      </Head>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </SpotifyAuthContext.Provider>
  )
}

export default App
