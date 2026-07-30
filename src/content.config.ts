import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const authors = defineCollection({
	loader: file("src/data/authors.json"),
	schema: z.object({
		name: z.string(),
		bio: z.string(),
		avatar: z.string().optional(),
		portfolio: z.string().url().optional()
	})
});

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: reference("authors"),
		draft: z.boolean().default(false)
	})
});

export const collections = { blog, authors };
