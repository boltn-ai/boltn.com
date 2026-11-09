// The Newsprint palette for the share-image generators. Satori cannot resolve CSS custom
// properties, so these are the hex equivalents of the OKLCH tokens in app/tokens.css. Keep them
// in step by hand: paper, ink, ink-2, muted, rule and the brick accent.
export const OG = {
	paper: "#EEEBE3",
	ink: "#130E0A",
	ink2: "#2B2521",
	muted: "#5E5650",
	rule: "#3D3732",
	accent: "#8C2F1F",
	/** No web font is fetched in the image runtime: a system serif stands in for Zilla Slab. */
	font: "Georgia, 'Times New Roman', serif",
} as const;
