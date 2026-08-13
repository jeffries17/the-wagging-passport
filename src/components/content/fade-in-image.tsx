"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function FadeInImage({ className, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      onLoad={() => setLoaded(true)}
      className={cn(
        className,
        "transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0"
      )}
    />
  );
}
