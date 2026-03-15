import type { MetadataRoute } from "next";
import { posts } from "#content";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://boltn.com";

	const staticEntries: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1.0,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/book`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/thinking`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/legal/privacy`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/legal/cookies`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];

	const postEntries: MetadataRoute.Sitemap = posts
		.filter((post) => post.published)
		.map((post) => ({
			url: `${baseUrl}/thinking/${post.slug}`,
			lastModified: new Date(post.date),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		}));

	return [...staticEntries, ...postEntries];
}
