import 'normalize.css/normalize.css';
import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import AppHeader from '../components/AppHeader';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Spotify Dashboard app</title>
      </Head>
      <div>
        <AppHeader />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
