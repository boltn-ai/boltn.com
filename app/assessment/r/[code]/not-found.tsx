// The segment-scoped 404 for an invalid result link.
//
// Reached only from the result route, so the copy can be about the one thing that actually
// went wrong here — a clipped or altered code — instead of the site-wide "This page does not
// exist". It is a real 404 and must stay one: no redirect, no branch that returns 200, and
// nothing here that turns a broken link into a soft-404 for a crawler to index.
//
// Nothing from the URL reaches this file. The offending code is deliberately not echoed back:
// there is nothing useful in it for the reader, and reflecting an attacker-controlled string
// is how a page like this grows a vulnerability it had no reason to have.
//
// Structure follows app/not-found.tsx: the Banner head, the explanation, one action.

import { CtaButton } from "@/components/ui/cta-button";
import { Section } from "@/components/ui/section";

export default function ResultNotFound() {
	return (
		<Section className="min-h-[60dvh] pt-20 md:pt-28">
			<h1 className="text-ink">That link is not valid</h1>

			<p className="mt-6 max-w-[60ch] text-lg text-ink-2">
				Result links carry the answers in the address itself, and addresses get clipped when they
				are pasted: a chat window wraps one, a document turns half of it into a full stop. If the
				code is short by even one character it stops decoding, which is what just happened. The
				original link, copied whole, will still work; it does not expire.
			</p>

			<p className="mt-6 max-w-[60ch] text-lg text-ink-2">
				If you do not have it, the way back is to answer the eleven questions again. It is about
				three minutes.
			</p>

			<div className="mt-10">
				<CtaButton href="/assessment">Take the assessment</CtaButton>
			</div>
		</Section>
	);
}
