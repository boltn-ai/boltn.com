// Five band cards for social unfurls — one per MODEL.md §4 core band, rendered at build time.
//
// Deliberately NOT a per-result image. A per-code opengraph-image convention file would run a
// satori render, roughly 200–500ms of CPU, for every distinct code fetched across a
// 4,194,304-code URL space — bounded only by how many distinct codes someone chooses to
// request, which a crawler can drive arbitrarily high. It is the single largest unbounded-cost
// surface this phase could have introduced (T-04-21, T-04-22). Five cards capture essentially
// all of the distribution value, and D-03 already says the band is the headline and the number
// is secondary, so a card that shows the band and omits the number is *more* faithful to the
// model than one showing both.
//
// The [band] segment is attacker-controlled. It is only ever looked up in the fixed slug table
// below — never used in a filesystem path, a fetch or a template. An unrecognised slug falls
// through to a constant-cost generic card rather than erroring, mirroring the blog generator.
//
// No runtime export here on purpose. Next.js 16 lists that option as nodejs or a deprecated
// edge value, and omitting it defaults to nodejs. The blog's OG generator still pins the
// deprecated one; removing it there is a separate follow-up and out of scope for this plan.

import { ImageResponse } from "next/og";
import { BAND_SLUGS } from "../../_lib/scoring.ts";

const SIZE = { width: 1200, height: 630 };

// Satori cannot resolve CSS custom properties, so the palette is hardcoded hex — the same
// four values the blog generator uses, and the same reason. These must be kept in step with
// globals.css by hand; there is no way to reference the tokens from inside the image runtime.
const BG = "#0B0B09";
const ACCENT = "#C8842A";
const TEXT_PRIMARY = "#F2F0EA";
const TEXT_MUTED = "rgba(233,230,222,0.55)";

// Playfair and IBM Plex are not available in the image runtime without explicit font loading,
// which the existing generator does not do and which this file must not add — fetching a font
// per render would reintroduce exactly the per-request cost the five-card design removes.
const FONT = "system-ui, sans-serif";

// Slug back to band name. Derived from the scoring module's own table, so the two cannot drift.
const BAND_BY_SLUG: Record<string, string> = Object.fromEntries(
	Object.entries(BAND_SLUGS).map(([band, slug]) => [slug, band]),
);

export function generateStaticParams() {
	return Object.values(BAND_SLUGS).map((band) => ({ band }));
}

function genericCard() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "100%",
				backgroundColor: BG,
				padding: "60px",
			}}
		>
			<div
				style={{
					fontSize: 96,
					fontWeight: 700,
					color: TEXT_PRIMARY,
					letterSpacing: "-0.02em",
					fontFamily: FONT,
				}}
			>
				Steve Bolton
			</div>
			<div
				style={{
					fontSize: 28,
					color: ACCENT,
					marginTop: 24,
					textAlign: "center",
					fontFamily: FONT,
					maxWidth: 800,
					lineHeight: 1.4,
				}}
			>
				Engineering maturity and AI-assisted development
			</div>
		</div>,
		{ ...SIZE },
	);
}

export async function GET(_request: Request, { params }: { params: Promise<{ band: string }> }) {
	const { band } = await params;
	const name = BAND_BY_SLUG[band];
	if (!name) return genericCard();

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				backgroundColor: BG,
				padding: "60px",
			}}
		>
			<div
				style={{
					fontSize: 20,
					color: ACCENT,
					textTransform: "uppercase",
					letterSpacing: "0.15em",
					fontFamily: FONT,
				}}
			>
				AI Maturity Assessment
			</div>

			<div
				style={{
					fontSize: 72,
					fontWeight: 700,
					color: TEXT_PRIMARY,
					maxWidth: 1000,
					lineHeight: 1.1,
					fontFamily: FONT,
				}}
			>
				{name}
			</div>

			<div
				style={{
					fontSize: 24,
					color: TEXT_MUTED,
					letterSpacing: "-0.01em",
					fontFamily: FONT,
				}}
			>
				Steve Bolton
			</div>
		</div>,
		{ ...SIZE },
	);
}
