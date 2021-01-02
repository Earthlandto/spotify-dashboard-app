import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

export default function Index() {
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
    <div>
      <main>
        <button onClick={handleLogin}>Login</button>
      </main>
    </div>
  );
}
