import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import type { PostSummary } from "@/sanity/lib/types";
import { CategoryBadge } from "./category-badge";
import { FadeInImage } from "./fade-in-image";

export function PostCard({ post }: { post: PostSummary }) {
  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(640).height(420).fit("crop").url()
    : null;

  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {imageUrl && (
          <FadeInImage
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder={post.coverImage?.asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={post.coverImage?.asset.metadata?.lqip}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <CategoryBadge category={post.category} />
          {post.destination && (
            <span className="text-xs font-medium text-muted-foreground">
              {post.destination.name}
            </span>
          )}
        </div>
        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
