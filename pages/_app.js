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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <AppHeader />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
