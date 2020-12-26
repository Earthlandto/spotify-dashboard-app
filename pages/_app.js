import 'normalize.css/normalize.css';
import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import AppHeader from '../components/AppHeader';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dashtify · Spotify dashboard</title>
        <meta
          name="description"
          content="All the relevant use of your spotify account in one place"
        />
      </Head>
      <div>
        <AppHeader />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
