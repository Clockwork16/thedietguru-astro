import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
    loader: glob({
        pattern: "**/*.json",
        base: "./src/content/recipes"
    }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        content_html: z.string(),
        nutrition: z.object({
            calories: z.string(),
            protein: z.string(),
            carbs: z.string(),
            fat: z.string(),
            sugar: z.string(),
            fiber: z.string(),
        }),
        seo: z.object({
            meta_description: z.string(),
            keywords: z.array(z.string()),
        }),
    }),
});

export const collections = { recipes };
