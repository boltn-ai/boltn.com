import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineCollection, defineConfig, s } from "velite";

type HastNode = { type: string; tagName?: string; value?: string; children?: HastNode[] };

// The essays were written with "--" for a dash. Markdown leaves it as two hyphens, which a browser
// may break across lines. Set it as an em dash held to the word before it, outside code.
function rehypeTypographicDashes() {
	const walk = (node: HastNode) => {
		if (node.type === "element" && (node.tagName === "code" || node.tagName === "pre")) return;
		if (node.type === "text" && node.value) {
			node.value = node.value.replace(/\s+--\s+/g, "\u00a0\u2014 ");
		}
		for (const child of node.children ?? []) walk(child);
	};
	return (tree: HastNode) => walk(tree);
}

const posts = defineCollection({
	name: "Post",
	pattern: "blog/**/*.mdx",
	schema: s
		.object({
			title: s.string().max(120),
			date: s.isodate(),
			excerpt: s.string().max(200),
			category: s.string(),
			published: s.boolean().default(false),
			slug: s.path(),
			metadata: s.metadata(),
			toc: s.toc(),
			content: s.mdx(),
			html: s.markdown(),
		})
		.transform((data) => ({
			...data,
			slug: data.slug.replace(/^blog\//, ""),
		})),
});

export default defineConfig({
	root: "content",
	output: {
		data: ".velite",
		assets: "public/static",
		base: "/static/",
		name: "[name]-[hash:6].[ext]",
		clean: true,
	},
	collections: { posts },
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeTypographicDashes,
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: "vitesse-dark",
					keepBackground: false,
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "wrap",
				},
			],
		],
	},
});
