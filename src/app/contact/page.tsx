import { ContactForm } from "@/components/content/contact-form";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";
import type { ContactPageContent } from "@/sanity/lib/types";

const DEFAULTS = {
  eyebrow: "Contact",
  heading: "Say hello",
  intro:
    "Questions, collaboration ideas, or a pet-friendly spot we should know about? Send a note, or email hello@thewaggingpassport.com.",
  formButtonLabel: "Send message",
  successMessage: "Thanks for reaching out — we'll get back to you soon!",
};

export default async function ContactPage() {
  const contactPage = await sanityFetch<ContactPageContent | null>({
    query: contactPageQuery,
    tags: ["contactPage"],
  });

  const copy = { ...DEFAULTS, ...contactPage };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        {copy.eyebrow}
      </p>
      <h1 className="mt-2 font-heading text-4xl font-semibold text-foreground">
        {copy.heading}
      </h1>
      <p className="mt-3 text-muted-foreground">{copy.intro}</p>

      <ContactForm buttonLabel={copy.formButtonLabel} successMessage={copy.successMessage} />
    </div>
  );
}
