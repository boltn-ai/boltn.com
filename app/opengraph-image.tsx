import { ImageResponse } from "next/og";
import { OG } from "@/lib/og-theme";

export const runtime = "edge";

export const alt = "Steve Bolton: AI answers the average problem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
	return new ImageResponse(
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
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						fontSize: 88,
						fontWeight: 700,
						color: OG.ink,
						letterSpacing: "-0.02em",
						lineHeight: 1.05,
						maxWidth: 900,
					}}
				>
					AI answers the average problem.
				</div>
				<div style={{ fontSize: 32, color: OG.ink2, marginTop: 28, maxWidth: 900 }}>
					The work now is knowing how yours differs, and checking the answer.
				</div>
			</div>
			<div style={{ display: "flex", height: 10, width: 220, backgroundColor: OG.accent }} />
		</div>,
		{ ...size },
	);
}
