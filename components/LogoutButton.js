import React from 'react';
import { setCookie } from 'react-use-cookie';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove a cookie by setting the expiration date in the past
    setCookie('token', null, { days: -1 });
    router.push('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
