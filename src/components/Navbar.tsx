'use client';

import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';
import Container from './Container';

const Logo = () => <span className="font-bold text-xl tracking-tight">ShopEasy</span>;

export default function Navbar() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <Container>
        <div className="flex h-16 items-center justify-between w-full">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          {/* Cart Icon (always visible) */}
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
        </div>
      </Container>
      {/* Remove hamburger and mobile nav drawer */}
    </nav>
  );
}
