import React from 'react';
import Link from 'next/link';

import { APP_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full border-t py-2 text-center text-sm text-muted-foreground bg-background dark:text-zinc-100">
      <nav>
        <Link href="/" className="mx-2 hover:underline font-semibold">
          Home
        </Link>
        |
        <Link href="/cart" className="mx-2 hover:underline font-semibold">
          Cart
        </Link>
      </nav>
      <div>
        <span className="font-bold">{APP_NAME}</span>
        <span>{` – `}</span>
        <span className="italic">Your one-stop shop for everything!</span>
      </div>
    </footer>
  );
}
