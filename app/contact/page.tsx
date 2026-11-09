"use client";

import { useActionState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { OPEN_TO } from "@/lib/profile";
import { submitContact } from "./actions";

const initialState = { success: false, error: null };

export default function ContactPage() {
	const [state, formAction, isPending] = useActionState(submitContact, initialState);

	return (
		<>
			<PageHeader
				headline="Get in touch"
				subtitle="Hiring for platform or AI enablement leadership, or working on the same problems? Send a message and I will reply."
			/>

			<Section className="pt-0">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
					<div className="md:col-span-7">
						{state.success ? (
							<div role="alert" className="well px-6 py-8">
								<p className="font-display text-2xl text-ink">Message sent.</p>
								<p className="mt-3 text-ink-2">Thanks for reaching out. You will hear back soon.</p>
							</div>
						) : (
							<form action={formAction} className="space-y-8">
								{state.error && (
									<div role="alert" aria-live="assertive" className="well border-error px-6 py-4">
										<p className="text-error">{state.error}</p>
									</div>
								)}

								<div>
									<label htmlFor="name" className="block font-medium text-ink">
										Name
									</label>
									<input
										id="name"
										name="name"
										type="text"
										autoComplete="name"
										required
										className="field"
										placeholder="Your name"
									/>
								</div>

								<div>
									<label htmlFor="email" className="block font-medium text-ink">
										Email
									</label>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										inputMode="email"
										required
										className="field"
										placeholder="you@company.com"
									/>
								</div>

								<div>
									<label htmlFor="message" className="block font-medium text-ink">
										Message
									</label>
									<textarea
										id="message"
										name="message"
										required
										rows={6}
										className="field resize-y"
										placeholder="What are you working on?"
									/>
								</div>

								<button type="submit" disabled={isPending} className="btn btn--primary">
									{isPending ? "Sending…" : "Send message"}
								</button>
							</form>
						)}
					</div>

					<div className="md:col-span-4 md:col-start-9">
						<p className="border-t border-rule-2 pt-6 text-lg text-ink">{OPEN_TO}</p>
					</div>
				</div>
			</Section>
		</>
	);
}
