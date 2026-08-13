import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { PortableText } from "@/components/content/portable-text";
import { SectionHeading } from "@/components/content/section-heading";
import { PostCard } from "@/components/content/post-card";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allDestinationSlugsQuery, destinationBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import type { DestinationFull } from "@/sanity/lib/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: allDestinationSlugsQuery,
    tags: ["destination"],
  });
  return slugs.map((slug) => ({ slug }));
}

async function getDestination(slug: string) {
  return sanityFetch<DestinationFull | null>({
    query: destinationBySlugQuery,
    params: { slug },
    tags: ["destination", "post"],
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) return {};

  const ogSource = destination.seo?.ogImage || destination.heroImage;
  const ogImageUrl = ogSource
    ? urlForImage(ogSource).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: destination.seo?.metaTitle || `${destination.name} With a Dog`,
    description: destination.seo?.metaDescription || destination.intro,
    alternates: {
      canonical: `/destinations/${slug}`,
    },
    openGraph: ogImageUrl
      ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }
      : undefined,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) notFound();

  const heroUrl = destination.heroImage
    ? urlForImage(destination.heroImage).width(1600).height(800).fit("crop").url()
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Destinations", item: `${siteUrl}/destinations` },
      { "@type": "ListItem", position: 2, name: destination.name, item: `${siteUrl}/destinations/${slug}` },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="relative aspect-[16/7] w-full bg-muted">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <h1 className="mx-auto w-full max-w-6xl px-4 pb-8 font-heading text-4xl font-semibold text-white sm:px-6 sm:text-5xl">
            {destination.name}
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[2fr_1fr]">
        <article>
          {destination.body && <PortableText value={destination.body} />}
        </article>

        {destination.petTravelTips && (
          <aside className="h-fit rounded-2xl border border-border bg-secondary/40 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Pet Travel Tips for {destination.name}
            </h2>
            <div className="mt-3 text-sm [&_p]:mb-3">
              <PortableText value={destination.petTravelTips} />
            </div>
          </aside>
        )}
      </div>

      {destination.posts && destination.posts.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <SectionHeading title={`More on ${destination.name}`} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destination.posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
