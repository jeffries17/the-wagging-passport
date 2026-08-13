import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import type { GearItem } from "@/sanity/lib/types";

export function GearCard({ item }: { item: GearItem }) {
  const imageUrl = item.image
    ? urlForImage(item.image).width(500).height(500).fit("crop").url()
    : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-square w-full bg-muted">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-base font-semibold text-foreground">
          {item.name}
        </h3>
        {item.description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          {item.price && (
            <span className="text-sm font-medium text-foreground">
              {item.price}
            </span>
          )}
          <Button
            size="sm"
            variant="secondary"
            render={
              <a
                href={item.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
              />
            }
          >
            Shop now
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
