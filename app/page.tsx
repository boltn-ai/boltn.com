import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <Section className="flex flex-col items-center justify-center py-24 md:py-32">
      <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground">boltn</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        AI patterns that actually ship. Architecture-first consulting.
      </p>
    </Section>
  );
}
