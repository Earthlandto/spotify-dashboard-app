import React from 'react';
import Link from 'next/link';
import LoginButton from '../components/LoginButton';
import { useSelector } from 'react-redux';

export default function Index() {
  const isSessionActive = useSelector((state) => state.isSessionActive);

  const Content = isSessionActive ? (
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
