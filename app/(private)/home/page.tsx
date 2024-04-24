'use client';
import { Button as CreateUserBtn } from '@/app/components/Button';
import CreateUserForm from '@/app/components/CreateUserForm';

import Modal from '@/app/components/Modal';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col">
      <div className="container flex w-full justify-between p-10">
        <CreateUserBtn
          elTag="linkTag"
          title="crate new user"
          btnStyles="rounded-full bg-primary px-4 py-2 font-bold capitalize text-black hover:bg-secondary"
          path="?createuser=true"
          type="button"
        />
        {/* <Modal element={<CreateUserForm />} /> */}

        <button
          className="rounded-full bg-red-300 px-4 py-2 font-bold capitalize text-black hover:bg-red-200"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      </div>

      <div>
        <p className="absolute left-1/2 top-[calc(50%-0.75rem)]">
          Home Page
          <Link href="/anotherpage" className="block text-blue-600 underline">
            Go to anotherpage
          </Link>
        </p>
      </div>
    </main>
  );
}
