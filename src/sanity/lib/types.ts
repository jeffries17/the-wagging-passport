import type { PortableTextBlock } from "@portabletext/types";

export type PostCategory = "destination" | "guide" | "gear" | "story";

export interface SanityImageRef {
  asset: { _ref: string; _id?: string; metadata?: { lqip?: string } };
  alt?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageRef;
}

export interface AuthorSummary {
  name: string;
  petName?: string;
  slug: string;
  image?: SanityImageRef;
  petImage?: SanityImageRef;
  bio?: PortableTextBlock[];
  social?: { platform: string; url: string }[];
}

export interface DestinationSummary {
  name: string;
  slug: string;
  heroImage?: SanityImageRef;
  intro?: string;
}

export interface DestinationFull extends DestinationSummary {
  body?: PortableTextBlock[];
  petTravelTips?: PortableTextBlock[];
  seo?: Seo;
  posts?: PostSummary[];
}

export interface PostSummary {
  title: string;
  slug: string;
  category: PostCategory;
  excerpt?: string;
  coverImage?: SanityImageRef;
  publishedAt?: string;
  destination?: DestinationSummary;
  tags?: string[];
}

export interface PostFull extends PostSummary {
  body: PortableTextBlock[];
  author?: AuthorSummary;
  seo?: Seo;
}

export interface GearItem {
  name: string;
  slug: string;
  image?: SanityImageRef;
  description?: string;
  category?: string;
  price?: string;
  affiliateUrl: string;
  featured?: boolean;
}

export interface SiteSettings {
  title: string;
  tagline?: string;
  affiliateDisclosure?: string;
  social?: { platform: string; url: string }[];
  contactEmail?: string;
  defaultSeo?: Seo;
}

export interface HomePageContent {
  hero?: {
    badge?: string;
    heading?: string;
    subheading?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  journalSection?: {
    eyebrow?: string;
    title?: string;
    linkLabel?: string;
  };
  destinationsSection?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    linkLabel?: string;
  };
  newsletter?: {
    heading?: string;
    body?: string;
    buttonLabel?: string;
    successMessage?: string;
  };
}

export interface JournalPageContent {
  metaTitle?: string;
  metaDescription?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  emptyStateMessage?: string;
}

export interface ContactPageContent {
  metaTitle?: string;
  metaDescription?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  formButtonLabel?: string;
  successMessage?: string;
}
