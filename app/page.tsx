import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton } from "@/components/ui/cta-button";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "boltn — Architecture-first AI adoption",
  description:
    "The complexity did not disappear when you moved it into agents. boltn helps engineering leaders see the wall before they hit it.",
};

const claims = [
  {
    headline: "The pattern repeats",
    body: "Every major technology adoption cycle follows the same arc. Client-server, web, cloud, microservices — quick wins arrive fast, confidence builds, organisations scale their usage. Then the wall: the things that were easy at small scale become unmanageable at medium scale. Not because the technology failed, but because the underlying architecture was never designed for the new load. AI is in the false confidence phase right now. The quick wins are real. The trajectory is not.",
  },
  {
    headline: "Complexity moves. It doesn't disappear.",
    body: "When you move logic from code into an agent, the complexity of that logic relocates. The agent inherits every problem the previous system had — unclear requirements, brittle dependencies, implicit knowledge that only existed in one person's head — and operates on it autonomously, at speed, without the contextual judgment the human had. Hundreds of unarchitected agents is a distributed monolith by another name.",
  },
  {
    headline: "Start where you actually are",
    body: "Your architecture has 15 years of decisions baked into it. Your team has fears, opinions, and institutional knowledge that no vendor playbook accounts for. Applying a greenfield playbook to a legacy situation is exactly the mistake that creates the wall. The approach has to start from your actual state — tech state, org state, people state — not from an ideal starting point that does not exist.",
  },
];

const services = [
  {
    name: "Assessment",
    description:
      "A structured diagnostic of where you actually stand — architecture, organisation, and team readiness. Not a survey. A scored instrument that surfaces the specific gaps.",
    href: "/services",
  },
  {
    name: "Advisory",
    description:
      "Ongoing architectural guidance through the adoption curve. Weekly sessions, async review, decision support when the pressure is on.",
    href: "/services",
  },
  {
    name: "Project",
    description:
      "Hands-on delivery for teams that need an architect embedded in the work. Scoped engagements with clear boundaries and measurable outcomes.",
    href: "/services",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section className="py-24 md:py-32">
        <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
          The complexity didn&rsquo;t disappear when you moved it into agents. You just can&rsquo;t
          see it yet.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          The quick wins are real. The trajectory is not. boltn helps engineering leaders see the
          complexity wall before they hit it — and build the architecture to get through it.
        </p>
        <div className="mt-10">
          <CtaButton href="/book" size="lg">
            Book a discovery call
          </CtaButton>
        </div>
      </Section>

      {/* Argument — 3 claims */}
      <Section className="py-0 md:py-0">
        {claims.map((claim, i) => (
          <div
            key={claim.headline}
            className={`py-12 md:py-16${i < claims.length - 1 ? " border-b border-zinc-800" : ""}`}
          >
            <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              {claim.headline}
            </h2>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              {claim.body}
            </p>
          </div>
        ))}
      </Section>

      {/* Services overview */}
      <Section>
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          How we work
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.name}>
              <h3 className="text-lg font-medium text-foreground">{service.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
              <Link
                href={service.href}
                className="mt-3 inline-block text-sm font-medium text-[#22c55e] hover:text-[#4ade80]"
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Closing CTA */}
      <Section className="py-24 text-center md:py-32">
        <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          See the wall before you hit it.
        </h2>
        <p className="mt-4 text-muted-foreground">
          30 minutes. No pitch, no obligation. We talk about where your team is and what is not
          working yet.
        </p>
        <div className="mt-8">
          <CtaButton href="/book" size="lg">
            Book a discovery call
          </CtaButton>
        </div>
      </Section>
    </>
  );
}
