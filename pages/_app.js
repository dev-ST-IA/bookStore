import '../styles/globals.css'
import Layout from '../components/_layout'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    )
    
}

export default MyApp
