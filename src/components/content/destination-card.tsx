import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import type { DestinationSummary } from "@/sanity/lib/types";

export function DestinationCard({
  destination,
}: {
  destination: DestinationSummary;
}) {
  const imageUrl = destination.heroImage
    ? urlForImage(destination.heroImage).width(600).height(750).fit("crop").url()
    : null;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative flex aspect-[4/5] overflow-hidden rounded-2xl bg-muted"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={destination.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="relative mt-auto p-5">
        <h3 className="font-heading text-xl font-semibold text-white">
          {destination.name}
        </h3>
        {destination.intro && (
          <p className="mt-1 line-clamp-2 text-sm text-white/80">
            {destination.intro}
          </p>
        )}
      </div>
    </Link>
  );
}
