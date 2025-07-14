'use client';

import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import { Menu } from 'lucide-react';
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
              <NavigationMenuItem>
                <Link href="/">
                  <NavigationMenuLink asChild>
                    <span className="cursor-pointer">Products</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/cart">
                  <NavigationMenuLink asChild>
                    <span className="flex items-center gap-1 cursor-pointer">
                      Cart
                      <Badge className="ml-1" variant="default">
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
          <Link href="/" className="hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
            Products
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center hover:text-primary transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <span>Cart</span>
            <Badge className="ml-1" variant="default">
              {cartCount}
            </Badge>
          </Link>
        </div>
      )}
    </nav>
  );
}
