import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch with Steve Bolton about platform engineering and AI enablement roles, or to compare notes.",
};

export default function ContactLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
