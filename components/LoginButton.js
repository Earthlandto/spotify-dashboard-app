import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Button } from './UI/Button.styles';

export default function Index(props) {
  const router = useRouter();
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, isValidating } = useSWR(
    shouldFetch ? '/api/spotify-login-url' : null
  );
  const handleLogin = () => {
    if (!isValidating) {
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    setShouldFetch(false);
  }, []);

  if (data && data.url) {
    router.push(data.url);
  }

  return (
    <Button {...props} onClick={handleLogin}>
      {props.children || 'Connect your Spotify account'}
    </Button>
  );
}
