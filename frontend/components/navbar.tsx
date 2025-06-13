"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/marketing", label: "Marketing", icon: Video },
    { href: "/real-estate", label: "Real Estate", icon: Video },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center max-w-5xl m-auto px-5">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Veo3</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center transition-colors hover:text-foreground/80",
                  isActive ? "text-foreground" : "text-foreground/60"
                )}
              >
                <span className="relative py-1">
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center"></div>
      </div>
    </header>
  );
}
