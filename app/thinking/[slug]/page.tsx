import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "#content";
import { MDXContent } from "@/components/blog/mdx-components";
import { ShareButtons } from "@/components/blog/share-buttons";
import { LATEST_ROLE, ROLE } from "@/lib/profile";

interface PostPageProps {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return posts.filter((post) => post.published).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = posts.find((p) => p.slug === slug);
	if (!post) return {};
	return {
		// absolute: skip the "%s | Steve Bolton" template so post titles keep the full
		// 60-char SERP budget for their own keywords
		title: { absolute: post.title },
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			// siteName is re-declared because Next.js shallow-merges metadata —
			// a child openGraph replaces the parent's rather than merging into it
			siteName: "Steve Bolton",
			authors: ["Steve Bolton"],
			type: "article",
			publishedTime: post.date,
		},
	};
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;
	const post = posts.find((p) => p.slug === slug && p.published);
	if (!post) notFound();

	const readingTime = Math.max(1, Math.round(post.metadata.wordCount / 200));

	return (
		<article className="container pt-20 md:pt-28">
			{/* Post header */}
			<header className="max-w-[56rem]">
				<p className="byline">
					{post.category}, <time dateTime={post.date}>{formatDate(post.date)}</time>
				</p>
				<h1 className="mt-6 max-w-[24ch] text-display-s leading-[1.05] text-ink">{post.title}</h1>
				<p className="lead mt-6 text-ink-2">{post.excerpt}</p>
				<p className="byline mt-6">
					By Steve Bolton. <span className="agate">{readingTime}</span> min read
				</p>
			</header>
			<hr className="rule--double mt-12 mb-12 md:mb-16" />

			<div className="xl:grid xl:grid-cols-12 xl:gap-x-8">
				{/* The running index: the essay's sections, held in the left margin on wide screens */}
				{post.toc.length > 2 && (
					<aside aria-label="In this essay" className="hidden xl:col-span-3 xl:block">
						<div className="essay-index sticky top-24 pr-4">
							<p className="byline pb-2">In this essay</p>
							<ol className="border-t border-rule text-sm leading-snug">
								{post.toc.map((entry) => (
									<li key={entry.url} className="border-b border-rule">
										<a href={entry.url}>{entry.title}</a>
									</li>
								))}
							</ol>
						</div>
					</aside>
				)}

				<div className="min-w-0 xl:col-span-8 xl:col-start-4">
					{/* Prose: one column at a reading measure */}
					<div className="prose">
						<MDXContent code={post.content} />
					</div>

					{/* Author */}
					<aside
						className="mt-16 max-w-[65ch] border-t border-rule pt-6"
						aria-label="About the author"
					>
						<p className="text-ink-2">
							Steve Bolton is a {ROLE}, most recently {LATEST_ROLE}.{" "}
							<Link href="/about" className="link">
								More about me
							</Link>
							.
						</p>
					</aside>

					{/* Share buttons */}
					<div className="max-w-[65ch]">
						<ShareButtons title={post.title} url={`https://boltn.com/thinking/${post.slug}`} />
					</div>
				</div>
			</div>
		</article>
	);
}

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
