'use client';

import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './ui/navigation-menu';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Container from './Container';

const Logo = () => <span className="font-bold text-xl tracking-tight">ShopEasy</span>;

export default function Navbar() {
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Removed Products link */}
              <NavigationMenuItem>
                <Link href="/cart">
                  <NavigationMenuLink asChild>
                    <span className="relative flex items-center gap-1">
                      <ShoppingCart className="w-6 h-6" aria-label="Cart" />
                      <Badge
                        className="absolute -top-2 -right-3 px-1.5 py-0.5 text-[10px] min-w-[18px] h-[18px] flex items-center justify-center"
                        variant="default"
                      >
                        {cartCount}
                      </Badge>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </Container>
      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-2 flex flex-col gap-4">
          {/* Removed Products link */}
          <Link
            href="/cart"
            className="relative flex items-center hover:text-primary transition-colors"
            onClick={() => setMobileOpen(false)}
          >
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
      )}
    </nav>
  );
}
