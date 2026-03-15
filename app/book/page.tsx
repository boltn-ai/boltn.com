import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

const calEmbedUrl = process.env.NEXT_PUBLIC_CAL_EMBED_URL;

export default function BookPage() {
  return (
    <>
      <PageHeader headline="Book a Discovery Call" />

      <Section className="pt-0">
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          30 minutes. No pitch, no obligation. We will talk about where your team is and what is not
          working yet.
        </p>

        <div className="mt-10">
          {calEmbedUrl ? (
            <iframe
              src={calEmbedUrl}
              title="Book a discovery call"
              className="w-full rounded-md border-0 bg-[#18181b]"
              style={{ minHeight: "600px" }}
            />
          ) : (
            <div className="flex min-h-[400px] items-center justify-center rounded-md border border-border bg-card">
              <p className="text-center text-muted-foreground">
                Booking widget loading... If you don't see a calendar,{" "}
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#22c55e] underline underline-offset-4 hover:text-[#4ade80]"
                >
                  visit Cal.com
                </a>{" "}
                directly.
              </p>
            </div>
          )}
        </div>

        <p className="mt-10 text-muted-foreground">
          Prefer email? Send a message on our{" "}
          <Link
            href="/contact"
            className="text-[#22c55e] underline underline-offset-4 hover:text-[#4ade80]"
          >
            contact page
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
