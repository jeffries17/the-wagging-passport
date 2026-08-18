import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon } from "./instagram-icon";
import { TikTokIcon } from "./tiktok-icon";
import { Logo } from "./logo";
import { primaryNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Real-world guides for traveling the world with a small dog in
              tow — from Caitlin and her chihuahua, Tishka.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/thewaggingpassport"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@thewaggingpassport"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@thewaggingpassport.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Explore
            </h3>
            <ul className="mt-3 space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Site
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Caitlin &amp; Tishka
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-sm text-muted-foreground hover:text-primary">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/80 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            The Wagging Passport participates in affiliate programs, including
            the Amazon Associates Program and hotel/booking affiliate
            partnerships. We may earn a commission on qualifying purchases
            made through links on this site, at no additional cost to you.{" "}
            <Link href="/disclosure" className="underline hover:text-primary">
              Learn more
            </Link>
            .
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Wagging Passport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
