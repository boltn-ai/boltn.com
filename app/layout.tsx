import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Libre_Franklin, Spectral, Zilla_Slab } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { FOCUS, HEADLINE, LINKEDIN_URL, ROLE } from "@/lib/profile";

const zilla = Zilla_Slab({
	variable: "--font-zilla",
	subsets: ["latin"],
	weight: ["700"],
	display: "swap",
});

const spectral = Spectral({
	variable: "--font-spectral",
	subsets: ["latin"],
	weight: ["400", "500"],
	style: ["normal", "italic"],
	display: "swap",
});

const franklin = Libre_Franklin({
	variable: "--font-franklin",
	subsets: ["latin"],
	weight: ["500"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://boltn.com"),
	title: {
		default: "Steve Bolton",
		template: "%s | Steve Bolton",
	},
	description: `Steve Bolton is a ${ROLE} working on ${FOCUS}, and writing on engineering maturity and AI-assisted development.`,
	openGraph: {
		type: "website",
		locale: "en_GB",
		siteName: "Steve Bolton",
	},
	twitter: {
		card: "summary_large_image",
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": "https://boltn.com/#website",
			name: "Steve Bolton",
			url: "https://boltn.com",
			author: { "@id": "https://boltn.com/#person" },
		},
		{
			"@type": "Person",
			"@id": "https://boltn.com/#person",
			name: "Steve Bolton",
			description: `${HEADLINE} Writes on engineering maturity and AI-assisted development.`,
			url: "https://boltn.com/about",
			sameAs: [LINKEDIN_URL],
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-GB" className={`${zilla.variable} ${spectral.variable} ${franklin.variable}`}>
			<body className="flex flex-col">
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: controlled static JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[600] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
				>
					Skip to main content
				</a>
				<Header />
				<main id="main-content" className="flex-1">
					{children}
				</main>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
