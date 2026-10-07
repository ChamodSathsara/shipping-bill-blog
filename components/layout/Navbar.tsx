"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { mainNav } from "../../lib/navigation";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { Container } from "../ui/Container";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavDropdown } from "./NavDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { navLinkClass } from "./navLinkClass";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) =>
            <li key={item.href}>
                {item.children ?
              <NavDropdown item={item} /> :

              <Link href={item.href} className={navLinkClass(item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))}>
                    {item.label}
                  </Link>
              }
              </li>
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className={buttonVariants({ variant: "ghost", size: "icon", className: "lg:hidden" })}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}>
            
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Container>
      <MobileNav open={mobileOpen} onClose={close} />
    </header>);

}
