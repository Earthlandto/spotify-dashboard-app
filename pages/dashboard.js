import React from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import useCookie from 'react-use-cookie';
import DashboardContent from '../components/DashboardContent';

export default function Dashboard() {
  const router = useRouter();
  const { code } = router.query;
  const [userToken, setUserToken] = useCookie('token', '');
  const { data, isValidating } = useSWR(
    code && !userToken ? `api/login-spotify?code=${code}` : null
  );

  if (data && data.token) {
    setUserToken(data.token);
    mutate('/api/current-spotify-user');
  }

  if (userToken && code) {
    // Clean code param from U
    router.replace('/dashboard');
  }

  const Loading = isValidating && <p>Loading...</p>;
  const Content = userToken && <DashboardContent />;

  return (
    <main>
      {Loading}
      {Content}
    </main>
  );
}
