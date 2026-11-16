import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// The site is statically generated, so per-request nonces are not available and Next.js's inline
// bootstrap scripts need 'unsafe-inline'. Everything else, Vercel Analytics included, is same-origin.
const contentSecurityPolicy = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: blob:",
	"font-src 'self'",
	`connect-src 'self'${isDev ? " ws:" : ""}`,
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
	{ key: "Content-Security-Policy", value: contentSecurityPolicy },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
	},
];

const nextConfig: NextConfig = {
	async headers() {
		return [{ source: "/:path*", headers: securityHeaders }];
	},
	// Retired routes; keep their old URLs working.
	async redirects() {
		return [
			{ source: "/services", destination: "/about", permanent: true },
			{ source: "/book", destination: "/contact", permanent: true },
		];
	},
};
export default nextConfig;
