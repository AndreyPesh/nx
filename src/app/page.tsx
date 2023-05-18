import Link from 'next/link';
import { Suspense } from 'react';
import Loading from './loading';

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <h1>Hello, Next</h1>
      <Link href={'/dashboard'}>Dashboard</Link>
      <Link href={'/profile'}>Profile</Link>
    </Suspense>
  );
}
