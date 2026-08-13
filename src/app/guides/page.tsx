import type { Metadata } from "next";
import { SectionHeading } from "@/components/content/section-heading";
import { PostCard } from "@/components/content/post-card";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsByCategoryQuery } from "@/sanity/lib/queries";
import type { PostSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Dog Travel Guides",
  description:
    "Practical, evergreen guides for traveling with your dog — flying with a dog, spotting genuinely pet-friendly hotels, and comparing booking platforms.",
  alternates: {
    canonical: "/guides",
  },
};

export default async function GuidesPage() {
  const guides = await sanityFetch<PostSummary[]>({
    query: postsByCategoryQuery,
    params: { category: "guide" },
    tags: ["post"],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Guides"
        title="Everything you need to travel with your dog"
        description="Flying logistics, spotting genuinely pet-friendly hotels, and comparing booking platforms — the practical stuff, explained clearly."
      />
      {guides.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">
          Guides are on their way — check back shortly.
        </p>
      )}
    </div>
  );
}
