import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineCollection, defineConfig, s } from "velite";

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
