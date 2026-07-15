import Link from "next/link";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingFooter } from "@/components/landing/landing-footer";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full">
      <header className="sticky top-4 z-50 mx-auto w-full max-w-3xl px-4">
        <div className="flex items-center justify-between rounded-full border bg-background/80 px-5 py-2.5 shadow-sm backdrop-blur-md">
          <Link href="/" className="text-sm font-semibold">
            Resume Builder
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Log in
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <LandingHero />
      <LandingFeatures />
      <LandingFooter />
    </div>
  );
}
