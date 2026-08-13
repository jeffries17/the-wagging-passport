import Image from "next/image";
import type { Metadata } from "next";
import { PortableText } from "@/components/content/portable-text";
import { sanityFetch } from "@/sanity/lib/fetch";
import { primaryAuthorQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import type { AuthorSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Caitlin and Tishka the chihuahua — the humans (and dog) behind The Wagging Passport.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const author = await sanityFetch<AuthorSummary | null>({
    query: primaryAuthorQuery,
    tags: ["author"],
  });

  const imageUrl = author?.image
    ? urlForImage(author.image).width(500).height(500).fit("crop").url()
    : null;
  const petImageUrl = author?.petImage
    ? urlForImage(author.petImage).width(500).height(500).fit("crop").url()
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        About
      </p>
      <h1 className="mt-2 font-heading text-4xl font-semibold text-foreground">
        {author?.name ?? "Caitlin"} &amp; {author?.petName ?? "Tishka"}
      </h1>

      {(imageUrl || petImageUrl) && (
        <div className="mt-8 flex gap-4">
          {imageUrl && (
            <div className="relative aspect-square w-1/2 overflow-hidden rounded-2xl bg-muted">
              <Image src={imageUrl} alt={author?.name ?? "Caitlin"} fill className="object-cover" />
            </div>
          )}
          {petImageUrl && (
            <div className="relative aspect-square w-1/2 overflow-hidden rounded-2xl bg-muted">
              <Image src={petImageUrl} alt={author?.petName ?? "Tishka"} fill className="object-cover" />
            </div>
          )}
        </div>
      )}

      <div className="mt-10">
        {author?.bio ? (
          <PortableText value={author.bio} />
        ) : (
          <p className="text-muted-foreground">
            Caitlin and her chihuahua Tishka travel the world together —
            navigating airline pet policies, questionable &quot;pet-friendly&quot;
            hotel listings, and everything in between so you don&apos;t have
            to guess. This page updates as soon as Caitlin fills it in from
            the Studio.
          </p>
        )}
      </div>
    </div>
  );
}
