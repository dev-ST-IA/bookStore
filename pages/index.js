import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Book Store</title>
        <meta name="Book Store Web App" content="Book Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
