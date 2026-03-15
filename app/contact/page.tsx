"use client";

import Link from "next/link";
import { useActionState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { submitContact } from "./actions";

const initialState = { success: false, error: null };

export default function ContactPage() {
	const [state, formAction, isPending] = useActionState(
		submitContact,
		initialState,
	);

	return (
		<>
			<PageHeader
				headline="Get in touch"
				subtitle="Not ready to book? Drop a message. No forms committee, no 3-day SLA. Just a reply."
			/>

			<Section className="pt-0">
				{state.success ? (
					<div
						role="alert"
						className="border border-[--border] bg-[--accent-faint] p-6"
					>
						<p className="text-lg font-medium text-foreground">Message sent.</p>
						<p className="mt-2 text-muted-foreground">
							Thanks for reaching out. You will hear back soon.
						</p>
					</div>
				) : (
					<form action={formAction} className="max-w-xl space-y-6">
						{state.error && (
							<div
								role="alert"
								aria-live="assertive"
								className="border border-red-500/30 bg-red-500/10 p-4"
							>
								<p className="text-sm text-red-400">{state.error}</p>
							</div>
						)}

						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-foreground"
							>
								Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								className="mt-1 block w-full border border-border bg-card px-3 py-2 text-foreground placeholder-muted-foreground focus:border-[--accent] focus:outline-none"
								placeholder="Your name"
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-foreground"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="mt-1 block w-full border border-border bg-card px-3 py-2 text-foreground placeholder-muted-foreground focus:border-[--accent] focus:outline-none"
								placeholder="you@company.com"
							/>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-foreground"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								required
								rows={5}
								className="mt-1 block w-full resize-y border border-border bg-card px-3 py-2 text-foreground placeholder-muted-foreground focus:border-[--accent] focus:outline-none"
								placeholder="What are you working on?"
							/>
						</div>

						<button
							type="submit"
							disabled={isPending}
							className="w-full bg-[--accent] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[--bg] transition-opacity duration-200 hover:opacity-[0.88] disabled:opacity-50"
						>
							{isPending ? "Sending..." : "Send message"}
						</button>
					</form>
				)}

				<p className="mt-10 text-muted-foreground">
					Or{" "}
					<Link
						href="/book"
						className="text-[--accent] underline underline-offset-4 hover:text-[--text-body]"
					>
						book a discovery call
					</Link>{" "}
					directly.
				</p>
			</Section>
		</>
	);
}
