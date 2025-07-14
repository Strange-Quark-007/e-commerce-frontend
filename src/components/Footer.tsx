import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t py-4 text-center text-sm text-muted-foreground bg-white">
      &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
    </footer>
  );
}
