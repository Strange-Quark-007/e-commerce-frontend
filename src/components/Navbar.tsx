'use client';

import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { Badge } from './ui/badge';
import Container from './Container';
import { useTheme } from 'next-themes';
import { APP_NAME } from '../lib/constants';

const Logo = () => <span className="font-bold text-xl tracking-tight">{APP_NAME}</span>;

export default function Navbar() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background border-b z-50 text-foreground">
      <Container>
        <div className="flex h-16 items-center justify-between w-full">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          {/* Cart Icon and Theme Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative flex items-center hover:text-primary transition-colors">
              <span className="relative flex items-center">
                <ShoppingCart className="w-6 h-6" aria-label="Cart" />
                <Badge
                  className="absolute -top-2 -right-3 px-1.5 py-0.5 text-[10px] min-w-[18px] h-[18px] flex items-center justify-center"
                  variant="default"
                >
                  {cartCount}
                </Badge>
              </span>
            </Link>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-2 p-2 rounded-full hover:bg-accent transition-colors focus:outline-none"
              type="button"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>
      {/* Remove hamburger and mobile nav drawer */}
    </nav>
  );
}
