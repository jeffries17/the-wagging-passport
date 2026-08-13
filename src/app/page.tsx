import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/content/hero";
import { SectionHeading } from "@/components/content/section-heading";
import { PostCard } from "@/components/content/post-card";
import { DestinationCard } from "@/components/content/destination-card";
import { NewsletterForm } from "@/components/content/newsletter-form";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allDestinationsQuery, homePageQuery, latestPostsQuery } from "@/sanity/lib/queries";
import type { DestinationSummary, HomePageContent, PostSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: {
    absolute: "The Wagging Passport — Dog-Friendly Travel Guides & Destinations",
  },
  description:
    "Real advice for traveling with a dog: flying tips, pet-friendly hotels, and country-by-country destination guides from Caitlin and her chihuahua Tishka.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const [latestPosts, destinations, homePage] = await Promise.all([
    sanityFetch<PostSummary[]>({
      query: latestPostsQuery,
      params: { limit: 6 },
      tags: ["post"],
    }),
    sanityFetch<DestinationSummary[]>({
      query: allDestinationsQuery,
      tags: ["destination"],
    }),
    sanityFetch<HomePageContent | null>({
      query: homePageQuery,
      tags: ["homePage"],
    }),
  ]);

  const journalSection = {
    eyebrow: homePage?.journalSection?.eyebrow ?? "Fresh off the leash",
    title: homePage?.journalSection?.title ?? "Latest from the journal",
    linkLabel: homePage?.journalSection?.linkLabel ?? "View all posts →",
  };

  const destinationsSection = {
    eyebrow: homePage?.destinationsSection?.eyebrow ?? "Where we've been",
    title: homePage?.destinationsSection?.title ?? "Explore destinations",
    description:
      homePage?.destinationsSection?.description ??
      "Country-by-country guides covering entry requirements, pet-friendly stays, and on-the-ground tips.",
    linkLabel: homePage?.destinationsSection?.linkLabel ?? "All destinations →",
  };

  return (
    <>
      <Hero content={homePage?.hero} />

      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={journalSection.eyebrow} title={journalSection.title} />
            <Button variant="ghost" render={<Link href="/journal" />}>
              {journalSection.linkLabel}
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {destinations.length > 0 && (
        <section className="bg-secondary/30 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow={destinationsSection.eyebrow}
                title={destinationsSection.title}
                description={destinationsSection.description}
              />
              <Button variant="ghost" render={<Link href="/destinations" />}>
                {destinationsSection.linkLabel}
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {destinations.slice(0, 4).map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterForm content={homePage?.newsletter} />
    </>
  );
}
