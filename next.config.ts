import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// The consulting pages are retired to archive/consulting/; keep their old URLs working.
	async redirects() {
		return [
			{ source: "/services", destination: "/about", permanent: true },
			{ source: "/book", destination: "/contact", permanent: true },
		];
	},
};
export default nextConfig;
