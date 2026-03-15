import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("mx-auto max-w-5xl px-6 py-16 md:py-24", className)}>
      {children}
    </section>
  );
}
