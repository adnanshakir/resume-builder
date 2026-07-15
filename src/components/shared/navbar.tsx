import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
  isLoggedIn: boolean;
}

export function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-3xl px-4">
      <div className="flex items-center justify-between rounded-full border bg-background/95 px-5 py-2.5 shadow-sm backdrop-blur-xl">
        <Link href="/" className="text-sm font-semibold">
          Resume Builder
        </Link>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Log in
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}