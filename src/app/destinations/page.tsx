import type { Metadata } from "next";
import { SectionHeading } from "@/components/content/section-heading";
import { DestinationCard } from "@/components/content/destination-card";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allDestinationsQuery } from "@/sanity/lib/queries";
import type { DestinationSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Dog-Friendly Travel Destinations",
  description:
    "Country-by-country pet travel guides — entry requirements, pet-friendly stays, and on-the-ground tips for traveling abroad with your dog.",
  alternates: {
    canonical: "/destinations",
  },
};

export default async function DestinationsPage() {
  const destinations = await sanityFetch<DestinationSummary[]>({
    query: allDestinationsQuery,
    tags: ["destination"],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Destinations"
        title="Where to go with your dog"
        description="Every destination guide is written from an actual trip with Tishka — real requirements, real hotels, real mistakes to avoid."
      />
      {destinations.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">
          Destination guides are coming soon — check back shortly.
        </p>
      )}
    </div>
  );
}
