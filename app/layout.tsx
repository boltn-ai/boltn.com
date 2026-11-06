import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { FOCUS, HEADLINE, LINKEDIN_URL, ROLE } from "@/lib/profile";

const playfair = Playfair_Display({
	variable: "--font-display",
	subsets: ["latin"],
	display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	weight: ["400", "500"],
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
		<html lang="en">
			<body
				className={`${playfair.variable} ${ibmPlexMono.variable} flex min-h-screen flex-col antialiased`}
			>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: controlled static JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-(--accent) focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-(--bg)"
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
