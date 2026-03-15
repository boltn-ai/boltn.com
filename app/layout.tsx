import type { Metadata } from "next";
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

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
		default: "boltn",
		template: "%s | boltn",
	},
	description:
		"The quick wins are real. The trajectory is not. boltn helps engineering leaders see the complexity wall before they hit it.",
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "boltn",
	},
	twitter: {
		card: "summary_large_image",
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": "https://boltn.com/#organization",
			name: "boltn",
			url: "https://boltn.com",
			description:
				"AI-first software development and consulting agency helping engineering leaders navigate AI adoption with architectural integrity.",
			founder: { "@id": "https://boltn.com/#person" },
		},
		{
			"@type": "Person",
			"@id": "https://boltn.com/#person",
			name: "Steve Bolton",
			jobTitle: "Founder",
			worksFor: { "@id": "https://boltn.com/#organization" },
			url: "https://boltn.com/about",
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
					className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[--accent] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[--bg]"
				>
					Skip to main content
				</a>
				<Header />
				<main id="main-content" className="flex-1">
					{children}
				</main>
				<CookieBanner />
				<Footer />
			</body>
		</html>
	);
}
