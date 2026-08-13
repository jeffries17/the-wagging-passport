import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allDestinationSlugsQuery, allPostSlugsQuery } from "@/sanity/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const staticRoutes = [
  "",
  "/destinations",
  "/guides",
  "/gear",
  "/journal",
  "/about",
  "/contact",
  "/disclosure",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, destinationSlugs] = await Promise.all([
    sanityFetch<string[]>({ query: allPostSlugsQuery, tags: ["post"] }),
    sanityFetch<string[]>({ query: allDestinationSlugsQuery, tags: ["destination"] }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const postEntries: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${siteUrl}/journal/${slug}`,
    lastModified: new Date(),
  }));

  const destinationEntries: MetadataRoute.Sitemap = destinationSlugs.map((slug) => ({
    url: `${siteUrl}/destinations/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...destinationEntries, ...postEntries];
}
