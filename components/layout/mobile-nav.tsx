"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <div
      ref={navRef}
      className={cn(
        "overflow-hidden border-t border-[#3f3f46] bg-[#0a0a0a] transition-all duration-200 ease-in-out md:hidden",
        open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
      )}
    >
      <nav className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6">
        <Link
          href="/about"
          onClick={onClose}
          className="text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          About
        </Link>
        <Link
          href="/services"
          onClick={onClose}
          className="text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          Services
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          Contact
        </Link>
        <CtaButton href="/book" size="default" className="w-fit">
          Book a discovery call
        </CtaButton>
      </nav>
    </div>
  );
}
