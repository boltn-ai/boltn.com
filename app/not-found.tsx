import Link from "next/link";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">This page does not exist.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-[#22c55e] px-6 py-3 text-base font-medium text-[#0a0a0a] transition-colors hover:bg-[#4ade80]"
      >
        Back to home
      </Link>
    </Section>
  );
}
