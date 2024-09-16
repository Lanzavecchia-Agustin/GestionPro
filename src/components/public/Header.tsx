'use client';

import { BoxIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <Link className="flex items-center justify-center" href="#">
        <BoxIcon className="h-6 w-6" />
        <span className="ml-2 text-xl font-bold">GestiónPro</span>
      </Link>

      <div className="ml-auto lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" aria-label="Toggle navigation">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5} align="end">
            <DropdownMenuItem asChild>
              <Link href="#features">Características</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#why-us">Por qué elegirnos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#pricing">Precios</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="hidden lg:flex ml-auto gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors"
          href="#features"
        >
          Características
        </Link>
        <Link
          className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors"
          href="#why-us"
        >
          Por qué elegirnos
        </Link>
        <Link
          className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors"
          href="#pricing"
        >
          Precios
        </Link>
      </nav>
    </header>
  );
}
