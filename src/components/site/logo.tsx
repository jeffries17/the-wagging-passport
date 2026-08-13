import Link from "next/link";
import { PawPrint } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-heading text-xl font-semibold tracking-tight text-foreground"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <PawPrint className="h-5 w-5" strokeWidth={2.5} />
      </span>
      The Wagging Passport
    </Link>
  );
}
