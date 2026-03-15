import { Feed } from "feed";
import { posts } from "#content";

export function GET() {
	const published = posts
		.filter((p) => p.published)
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

	const feed = new Feed({
		title: "boltn -- Thinking",
		description:
			"Architecture-first AI adoption for engineering leaders",
		id: "https://boltn.com/thinking",
		link: "https://boltn.com/thinking",
		copyright: `${new Date().getFullYear()} boltn`,
		feedLinks: { rss2: "https://boltn.com/rss.xml" },
	});

	for (const post of published) {
		feed.addItem({
			title: post.title,
			id: `https://boltn.com/thinking/${post.slug}`,
			link: `https://boltn.com/thinking/${post.slug}`,
			description: post.excerpt,
			content: post.html,
			date: new Date(post.date),
		});
	}

	return new Response(feed.rss2(), {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
