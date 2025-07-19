import Navbar from './Navbar';
import React from 'react';
import Container from './Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 bg-background">{children}</main>
      <footer className="w-full border-t py-4 text-center text-sm text-muted-foreground bg-white"></footer>
    </div>
  );
}
