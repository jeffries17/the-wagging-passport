import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "@/components/content/portable-text";
import { CategoryBadge } from "@/components/content/category-badge";
import { FadeInImage } from "@/components/content/fade-in-image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostSlugsQuery, postBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import type { PostFull } from "@/sanity/lib/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: allPostSlugsQuery,
    tags: ["post"],
  });
  return slugs.map((slug) => ({ slug }));
}

async function getPost(slug: string) {
  return sanityFetch<PostFull | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post"],
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const ogSource = post.seo?.ogImage || post.coverImage;
  const ogImageUrl = ogSource
    ? urlForImage(ogSource).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: `/journal/${slug}`,
    },
    openGraph: ogImageUrl
      ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }
      : undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const coverUrl = post.coverImage
    ? urlForImage(post.coverImage).width(1600).height(900).fit("crop").url()
    : null;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Journal", item: `${siteUrl}/journal` },
      { "@type": "ListItem", position: 2, name: post.title, item: `${siteUrl}/journal/${post.slug}` },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="flex items-center gap-3">
        <CategoryBadge category={post.category} />
        {post.destination && (
          <Link
            href={`/destinations/${post.destination.slug}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            {post.destination.name}
          </Link>
        )}
      </div>

      <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        {post.author?.name && <span>{post.author.name}</span>}
        {publishedDate && <span>· {publishedDate}</span>}
      </div>

      {coverUrl && (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          <FadeInImage
            src={coverUrl}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
            placeholder={post.coverImage?.asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={post.coverImage?.asset.metadata?.lqip}
          />
        </div>
      )}

      <div className="mt-10">
        <PortableText value={post.body} />
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
