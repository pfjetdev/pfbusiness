"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Logo } from "@/components/common/Logo";

const navItems = [
  {
    label: "Best Deals",
    href: "/deals",
  },
  {
    label: "Destinations",
    href: "/destinations",
  },
  {
    label: "Airlines",
    href: "/airlines",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contacts",
    href: "/contacts",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-pf-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Logo className="relative z-10" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-pf-navy hover:text-pf-red transition-colors"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Phone CTA */}
          <a
            href="tel:+1234567890"
            className="hidden lg:flex items-center gap-2 bg-pf-red hover:bg-pf-red-dark text-white px-4 py-2 rounded-lg shadow-pf-red hover:shadow-pf-lg transition-all duration-300 group"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] text-white/80 uppercase tracking-wide">Call us 24/7</span>
              <span className="text-sm font-bold">+1 (234) 567-890</span>
            </div>
          </a>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-pf-navy">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] bg-pf-ivory">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <Logo className="mb-8" />

                  <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center py-3 px-4 text-lg font-medium text-pf-navy hover:bg-pf-pearl rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-8 pt-8 border-t border-pf-pearl">
                    <a
                      href="tel:+1234567890"
                      className="flex items-center gap-4 bg-pf-red text-white p-4 rounded-xl shadow-pf-red"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-white/80 uppercase tracking-wide">Call us 24/7</span>
                        <span className="text-xl font-bold">+1 (234) 567-890</span>
                      </div>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

