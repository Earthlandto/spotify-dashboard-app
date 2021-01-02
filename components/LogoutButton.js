import React from 'react';
import useCookie from 'react-use-cookie';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  const [, setUserToken] = useCookie('token');

  const handleLogout = () => {
    // Remove a cookie by setting the expiration date in the past
    setUserToken(null, { days: -1 });
    router.push('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
