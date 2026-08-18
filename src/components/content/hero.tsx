import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/sanity/lib/types";

const DEFAULTS = {
  badge: "Because traveling without the dog was never an option",
  heading: "Sharing how little dogs can have big adventures.",
  subheading:
    "Honest guides on flying with your dog, finding hotels that are actually pet-friendly, and exploring destinations from Brazil to Japan — written from experience, not guesswork.",
  primaryCtaLabel: "Start With the Guides",
  primaryCtaHref: "/guides",
  secondaryCtaLabel: "Browse Destinations",
  secondaryCtaHref: "/destinations",
};

export function Hero({ content }: { content?: HomePageContent["hero"] }) {
  const hero = { ...DEFAULTS, ...content };

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/60 to-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground/80">
          <PawPrint className="h-4 w-4 text-primary" />
          {hero.badge}
        </span>
        <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
          {hero.heading}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">{hero.subheading}</p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button size="lg" render={<Link href={hero.primaryCtaHref} />}>
            {hero.primaryCtaLabel}
          </Button>
          <Button size="lg" variant="outline" render={<Link href={hero.secondaryCtaHref} />}>
            {hero.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
