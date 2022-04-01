import '../assets/globals.css'
import type { AppProps } from 'next/app'

//layout
import PageLayout from '../components/layout/PageLayout'

function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default App
