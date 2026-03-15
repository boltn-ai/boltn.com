import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
	title: "Book a Discovery Call",
	description:
		"30 minutes to talk through where your team is and what is not working yet. No pitch, no obligation.",
};

const calEmbedUrl = process.env.NEXT_PUBLIC_CAL_EMBED_URL;

export default function BookPage() {
	return (
		<>
			<PageHeader headline="Book a Discovery Call" />

			<Section className="pt-0">
				<p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
					30 minutes. No pitch, no obligation. We will talk about where your
					team is and what is not working yet.
				</p>

				<div className="mt-10">
					{calEmbedUrl ? (
						<iframe
							src={calEmbedUrl}
							title="Book a discovery call"
							className="w-full border-0 bg-[--bg-raised]"
							style={{ minHeight: "600px" }}
						/>
					) : (
						<div className="flex min-h-[400px] items-center justify-center border border-border bg-card">
							<p className="text-center text-muted-foreground">
								Booking widget loading... If you don&apos;t see a calendar,{" "}
								<a
									href="https://cal.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-[--accent] underline underline-offset-4 hover:text-[--text-body]"
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
						className="text-[--accent] underline underline-offset-4 hover:text-[--text-body]"
					>
						contact page
					</Link>
					.
				</p>
			</Section>
		</>
	);
}
