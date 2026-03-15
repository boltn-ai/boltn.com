import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#3f3f46]">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center">
        <div className="text-sm text-[#a1a1aa]">
          <span className="font-semibold text-foreground">boltn</span>
          <span className="ml-2">&copy; {new Date().getFullYear()}</span>
        </div>
        <nav className="flex gap-6 text-sm text-[#a1a1aa]">
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/services" className="transition-colors hover:text-foreground">
            Services
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
          <Link href="/book" className="transition-colors hover:text-foreground">
            Book
          </Link>
        </nav>
      </div>
    </footer>
  );
}
