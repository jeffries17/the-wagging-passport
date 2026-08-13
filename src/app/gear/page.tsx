import type { Metadata } from "next";
import { SectionHeading } from "@/components/content/section-heading";
import { GearCard } from "@/components/content/gear-card";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allGearItemsQuery } from "@/sanity/lib/queries";
import type { GearItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Dog Travel Gear",
  description:
    "The carriers, crates, and travel accessories that hold up on real trips with a small dog — honest picks for dog-friendly travel, not just a sponsor list.",
  alternates: {
    canonical: "/gear",
  },
};

export default async function GearPage() {
  const items = await sanityFetch<GearItem[]>({
    query: allGearItemsQuery,
    tags: ["gearItem"],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Travel Gear"
        title="Gear that's actually earned its spot in the carrier"
        description="Everything here has traveled with Tishka. Some links are affiliate links — see our disclosure for details."
      />
      {items.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <GearCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">
          The gear guide is being packed — check back shortly.
        </p>
      )}
    </div>
  );
}
