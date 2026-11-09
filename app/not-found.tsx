import Link from "next/link";
import { Section } from "@/components/ui/section";

export default function NotFound() {
	return (
		<Section className="min-h-[60dvh] pt-20 md:pt-28">
			<h1 className="text-ink">Page not found</h1>
			<p className="lead mt-6 text-ink-2">This page does not exist.</p>
			<Link href="/" className="btn btn--primary mt-10">
				Back to home
			</Link>
		</Section>
	);
}
