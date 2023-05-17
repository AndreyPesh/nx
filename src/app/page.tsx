import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Hello, Next</h1>
      <Link href={'/dashboard'}>Dashboard</Link>
      <Link href={'/profile'}>Profile</Link>
    </>
  );
}
