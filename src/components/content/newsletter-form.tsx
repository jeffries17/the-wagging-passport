"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { HomePageContent } from "@/sanity/lib/types";

const DEFAULTS = {
  heading: "Get new guides in your inbox",
  body: "No spam, just practical pet-travel tips and new destination guides as Caitlin and Tishka publish them.",
  buttonLabel: "Subscribe",
  successMessage: "Thanks — you're on the list!",
};

export function NewsletterForm({ content }: { content?: HomePageContent["newsletter"] }) {
  const [submitted, setSubmitted] = useState(false);
  const copy = { ...DEFAULTS, ...content };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="border-y border-border bg-primary/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
        <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          {copy.heading}
        </h2>
        <p className="max-w-md text-muted-foreground">{copy.body}</p>
        {submitted ? (
          <p className="pt-2 font-medium text-primary">{copy.successMessage}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-2 pt-2 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="bg-background"
            />
            <Button type="submit" className="sm:shrink-0">
              {copy.buttonLabel}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
