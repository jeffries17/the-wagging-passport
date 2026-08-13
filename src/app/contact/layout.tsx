import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";
import type { ContactPageContent } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await sanityFetch<ContactPageContent | null>({
    query: contactPageQuery,
    tags: ["contactPage"],
  });

  return {
    title: contactPage?.metaTitle ?? "Contact",
    description: contactPage?.metaDescription ?? "Get in touch with The Wagging Passport.",
    alternates: {
      canonical: "/contact",
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
