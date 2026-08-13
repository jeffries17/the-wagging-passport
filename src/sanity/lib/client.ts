import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // false so content fetches go through Next's fetch cache (tags + revalidate)
  // instead of Sanity's CDN, which doesn't support tag-based invalidation.
  useCdn: false,
  perspective: "published",
});
