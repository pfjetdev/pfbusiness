"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, Phone, Plane, Users } from "lucide-react";

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
import { EASE_OUT_EXPO } from "@/lib/animations";

interface NavItem {
  label: string;
  href: string;
}

interface TopBarLink {
  label: string;
  href: string;
  icon: typeof Users;
}

const PHONE = {
  number: "+1 (234) 567-890",
  href: "tel:+12345678900",
  label: "Call us 24/7",
};

const NAV_ITEMS: NavItem[] = [
  { label: "Best Deals", href: "/deals" },
  { label: "Destinations", href: "/destinations" },
  { label: "Airlines", href: "/airlines" },
  { label: "About Us", href: "/about" },
  { label: "Contacts", href: "/contacts" },
];

const TOP_BAR_LINKS: TopBarLink[] = [
  { label: "Group Travel", href: "/group-travel", icon: Users },
  { label: "Private Jet", href: "/private-jet", icon: Plane },
];

const SCROLL_THRESHOLD = 20;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);
  });

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: isScrolled ? -48 : 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        className="fixed top-0 left-0 right-0 z-[51] bg-white text-pf-navy"
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-10">
          <span className="text-xs text-pf-navy/50 font-medium tracking-wide uppercase hidden sm:block">
            Priority Flyers Group
          </span>
          <div className="flex items-center gap-2 ml-auto">
            {TOP_BAR_LINKS.map((link, index) => (
              <div key={link.href} className="flex items-center">
                {index > 0 && <span className="text-pf-navy/20 mr-2">|</span>}
                <Link
                  href={link.href}
                  className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-pf-navy/70 hover:text-pf-navy hover:bg-pf-navy/10 rounded-md transition-colors"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "top-2 px-3" : "top-10 px-0"
        }`}
      >
        <motion.div
          layout
          className="mx-auto"
          style={{
            maxWidth: isScrolled ? "100%" : "1280px",
            padding: isScrolled ? "10px 40px" : "20px 16px",
            backgroundColor: isScrolled ? "rgba(255,255,255,0.82)" : "transparent",
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            WebkitBackdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.6) inset"
              : "none",
            borderRadius: isScrolled ? "16px" : "0px",
          }}
          transition={{ layout: { duration: 0.4, ease: EASE_OUT_EXPO } }}
        >
          <nav className="flex items-center justify-between">
            <Logo variant={isScrolled ? "default" : "white"} className="relative z-10" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {NAV_ITEMS.map((item) => (
                    <NavigationMenuItem key={item.label}>
                      <Link
                        href={item.href}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          isScrolled
                            ? "text-pf-navy hover:text-pf-red"
                            : "text-white hover:text-white/70"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Phone CTA - Desktop */}
            <a
              href={PHONE.href}
              className="hidden lg:flex items-center gap-2 bg-pf-red hover:bg-pf-red-dark text-white px-4 py-2 rounded-lg shadow-pf-red hover:shadow-pf-lg transition-all duration-300 group"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-white/80 uppercase tracking-wide">
                  {PHONE.label}
                </span>
                <span className="text-sm font-bold">{PHONE.number}</span>
              </div>
            </a>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={isScrolled ? "text-pf-navy" : "text-white"}
                  >
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
                      {NAV_ITEMS.map((item) => (
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

                    {/* Phone CTA - Mobile */}
                    <div className="mt-8 pt-8 border-t border-pf-pearl">
                      <a
                        href={PHONE.href}
                        className="flex items-center gap-4 bg-pf-red text-white p-4 rounded-xl shadow-pf-red"
                      >
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-white/80 uppercase tracking-wide">
                            {PHONE.label}
                          </span>
                          <span className="text-xl font-bold">{PHONE.number}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}
