import 'normalize.css/normalize.css';
import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import AppHeader from '../components/AppHeader';
import { SWRConfig } from 'swr';
import fetcher from '../lib/fetcher';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { useStore } from '../store';

const StyledApp = styled.div`
  padding-bottom: 3rem;
  background-color: #2e2e2e;
  color: white;
`;

function MyApp({ Component, pageProps }) {
  config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
  const store = useStore(pageProps.initialReduxState);

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
      <StyledApp>
        <SWRConfig
          value={{
            fetcher: fetcher,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
          }}
        >
          <Provider store={store}>
            <AppHeader />
            <Component {...pageProps} />
          </Provider>
        </SWRConfig>
      </StyledApp>
    </>
  );
}

export default MyApp;
