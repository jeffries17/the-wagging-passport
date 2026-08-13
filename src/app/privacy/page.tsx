import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "The Wagging Passport privacy policy.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold text-foreground">
        Privacy Policy
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
        <p>
          We collect only what&apos;s needed to run this site: basic analytics
          on page visits, and any information you voluntarily submit through
          our contact or newsletter forms.
        </p>
        <p>
          We never sell your personal information. Email addresses collected
          through the newsletter are used solely to send occasional updates
          from The Wagging Passport, and you can unsubscribe at any time.
        </p>
        <p>
          This site contains affiliate links — see our{" "}
          <a href="/disclosure" className="underline hover:text-primary">
            Affiliate Disclosure
          </a>{" "}
          for details.
        </p>
      </div>
    </div>
  );
}
