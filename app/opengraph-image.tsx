import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Steve Bolton — Engineering maturity and AI-assisted development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
				Steve Bolton
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
				Engineering maturity and AI-assisted development
			</div>
		</div>,
		{ ...size },
	);
}
