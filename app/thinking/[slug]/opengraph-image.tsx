import { posts } from "#content";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "boltn / thinking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage({ params }: { params: { slug: string } }) {
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		return new ImageResponse(
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					height: "100%",
					backgroundColor: "#0B0B09",
					padding: "60px",
				}}
			>
				<div
					style={{
						fontSize: 96,
						fontWeight: 700,
						color: "#fafafa",
						letterSpacing: "-0.02em",
						fontFamily: "system-ui, sans-serif",
					}}
				>
					boltn
				</div>
				<div
					style={{
						fontSize: 28,
						color: "#C8842A",
						marginTop: 24,
						textAlign: "center",
						fontFamily: "system-ui, sans-serif",
						maxWidth: 800,
						lineHeight: 1.4,
					}}
				>
					Architecture-first AI adoption for engineering leaders
				</div>
			</div>,
			{ ...size },
		);
	}

	const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				backgroundColor: "#0B0B09",
				padding: "60px",
			}}
		>
			<div
				style={{
					fontSize: 20,
					color: "#C8842A",
					textTransform: "uppercase",
					letterSpacing: "0.15em",
					fontFamily: "system-ui, sans-serif",
				}}
			>
				boltn / thinking
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",
				}}
			>
				<div
					style={{
						fontSize: 52,
						fontWeight: 700,
						color: "#F2F0EA",
						maxWidth: 900,
						lineHeight: 1.15,
						fontFamily: "system-ui, sans-serif",
					}}
				>
					{post.title}
				</div>
				<div
					style={{
						fontSize: 22,
						color: "rgba(233,230,222,0.55)",
						maxWidth: 800,
						lineHeight: 1.4,
						fontFamily: "system-ui, sans-serif",
					}}
				>
					{post.excerpt}
				</div>
			</div>

			<div
				style={{
					fontSize: 18,
					color: "rgba(233,230,222,0.35)",
					fontFamily: "system-ui, sans-serif",
				}}
			>
				{formattedDate}
			</div>
		</div>,
		{ ...size },
	);
}
