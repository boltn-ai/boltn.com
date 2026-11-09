import { ImageResponse } from "next/og";
import { posts } from "#content";
import { OG } from "@/lib/og-theme";

export const runtime = "edge";

export const alt = "Steve Bolton, thinking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Frame({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				backgroundColor: OG.paper,
				padding: "64px",
				fontFamily: OG.font,
			}}
		>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: OG.ink }}>
					Steve Bolton
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 20,
						height: 5,
						borderTop: `1px solid ${OG.rule}`,
						borderBottom: `1px solid ${OG.rule}`,
					}}
				/>
			</div>
			{children}
		</div>
	);
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		return new ImageResponse(
			<Frame>
				<div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: OG.ink }}>
					Engineering maturity and AI-assisted development
				</div>
				<div style={{ display: "flex" }} />
			</Frame>,
			{ ...size },
		);
	}

	const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return new ImageResponse(
		<Frame>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						fontSize: 64,
						fontWeight: 700,
						color: OG.ink,
						letterSpacing: "-0.02em",
						lineHeight: 1.08,
						maxWidth: 1000,
					}}
				>
					{post.title}
				</div>
				<div
					style={{ fontSize: 28, color: OG.ink2, marginTop: 24, maxWidth: 950, lineHeight: 1.35 }}
				>
					{post.excerpt}
				</div>
			</div>
			<div style={{ display: "flex", fontSize: 24, color: OG.muted }}>
				{post.category}, {formattedDate}
			</div>
		</Frame>,
		{ ...size },
	);
}
