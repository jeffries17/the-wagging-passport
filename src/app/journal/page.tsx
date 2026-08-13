import type { Metadata } from "next";
import { SectionHeading } from "@/components/content/section-heading";
import { PostCard } from "@/components/content/post-card";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostsQuery, journalPageQuery } from "@/sanity/lib/queries";
import type { JournalPageContent, PostSummary } from "@/sanity/lib/types";

const DEFAULTS = {
  metaTitle: "Journal",
  metaDescription:
    "Every post from The Wagging Passport — destination guides, flying tips, hotel reviews, and gear picks for traveling with your dog.",
  eyebrow: "Journal",
  title: "All posts",
  description: "Every guide, story, and destination write-up, newest first.",
  emptyStateMessage: "Nothing published yet — the first posts are on their way.",
};

export async function generateMetadata(): Promise<Metadata> {
  const journalPage = await sanityFetch<JournalPageContent | null>({
    query: journalPageQuery,
    tags: ["journalPage"],
  });

  return {
    title: journalPage?.metaTitle ?? DEFAULTS.metaTitle,
    description: journalPage?.metaDescription ?? DEFAULTS.metaDescription,
    alternates: {
      canonical: "/journal",
    },
  };
}

export default async function JournalPage() {
  const [posts, journalPage] = await Promise.all([
    sanityFetch<PostSummary[]>({
      query: allPostsQuery,
      tags: ["post"],
    }),
    sanityFetch<JournalPageContent | null>({
      query: journalPageQuery,
      tags: ["journalPage"],
    }),
  ]);

  const copy = { ...DEFAULTS, ...journalPage };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      {posts.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">{copy.emptyStateMessage}</p>
      )}
    </div>
  );
}
