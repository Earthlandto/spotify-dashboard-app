import React from 'react';
import Link from 'next/link';
import LoginButton from '../components/LoginButton';
import useCookie from 'react-use-cookie';

export default function Index() {
  const [userToken] = useCookie('token', '');
  const Content = userToken ? (
    <Link href="/dashboard">Go to your dashboard</Link>
  ) : (
    <LoginButton />
  );
  return (
    <div>
      <main>{Content}</main>
    </div>
  );
}
