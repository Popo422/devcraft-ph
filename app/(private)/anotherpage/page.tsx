'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AnotherPage() {
  type messageType = {
    message: string;
  };
  const [message, setMessage] = useState();
  useEffect(() => {
    console.log(message);
  }, [message]);
  return (
    <main>
      <div>
        <p className="absolute left-1/2 top-[calc(50%-0.75rem)]">
          Another Page
          <div className="text-3xl text-black"> {message}</div>
          <Link href="/home" className="block text-blue-600 underline">
            Go to Home
          </Link>
        </p>
        <button
          className="rounded-lg bg-blue-500 p-2"
          onClick={async () => {
            const res = await fetch('api/getSamplePostResponse', {
              method: 'POST',
              body: JSON.stringify({ hello: 'Zernie' }),
            });
            if (res.ok) {
              const { message } = await res.json();
              setMessage(message);
            }
          }}
        >
          TEST
        </button>
      </div>
    </main>
  );
}
