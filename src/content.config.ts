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
	loader: glob({ base: "./src/content/blog", pattern: "**/[^_]*.md" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: reference("authors"),
		draft: z.boolean().default(false)
	})
});

const referendum = defineCollection({
	loader: glob({ base: "./src/content/referendum", pattern: "**/[^_]*.md" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		draft: z.boolean().default(false),
		order: z.number().optional()
	})
});

export const collections = { blog, authors, referendum };
