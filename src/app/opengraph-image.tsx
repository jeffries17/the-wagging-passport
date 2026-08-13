import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DEFAULT_TITLE = "The Wagging Passport";
const DEFAULT_TAGLINE = "Traveling the world with a small dog in tow";

export default async function Image() {
  const siteSettings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  const customImage = siteSettings?.defaultSeo?.ogImage
    ? urlForImage(siteSettings.defaultSeo.ogImage).width(size.width).height(size.height).url()
    : undefined;

  if (customImage) {
    return new ImageResponse(
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={customImage}
        alt=""
        width={size.width}
        height={size.height}
        style={{ objectFit: "cover" }}
      />,
      { ...size }
    );
  }

  const title = siteSettings?.title || DEFAULT_TITLE;
  const tagline = siteSettings?.tagline || DEFAULT_TAGLINE;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #fdf6ee 0%, #f6e7d8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#c9622f",
            color: "#fff",
            fontSize: 36,
            marginBottom: 32,
          }}
        >
          🐾
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#3a281c",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, color: "#7a6a5c", marginTop: 20 }}>{tagline}</div>
      </div>
    ),
    { ...size }
  );
}
