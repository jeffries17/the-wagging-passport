import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How The Wagging Passport uses affiliate links.",
  alternates: {
    canonical: "/disclosure",
  },
};

const defaultDisclosure = `The Wagging Passport participates in affiliate programs, including the Amazon Associates Program and various hotel and booking affiliate partnerships. This means that if you click a link on this site and make a purchase or booking, we may earn a small commission — at no additional cost to you.

We only recommend gear, hotels, and services that we've personally used or would genuinely recommend to a friend traveling with a dog. Affiliate relationships never influence our honest opinion of a product or place.`;

export default async function DisclosurePage() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  const disclosure = settings?.affiliateDisclosure || defaultDisclosure;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold text-foreground">
        Affiliate Disclosure
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
        {disclosure.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
