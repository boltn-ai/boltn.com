import Link from "next/link";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  href: string;
  size?: "default" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function CtaButton({ href, size = "default", className, children }: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-[#22c55e] font-medium text-[#0a0a0a] transition-colors hover:bg-[#4ade80]",
        size === "default" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className,
      )}
    >
      {children ?? "Book a discovery call"}
    </Link>
  );
}
