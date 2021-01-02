import React from 'react';
import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <main>
        <Link href="/dashboard">Go to your dashboard</Link>
      </main>
    </div>
  );
}
