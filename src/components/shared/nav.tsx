import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LogoutButton } from "@/components/shared/logout-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { FileText } from "lucide-react";

export async function Nav() {
  const userId = await getCurrentUser();
  const isLoggedIn = !!userId;

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-3xl px-4">
      <div className="flex items-center justify-between rounded-full ring-1 ring-border/30 bg-background/20 px-5 py-2.5 shadow-sm backdrop-blur-xl">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-1.5 text-sm font-semibold">
          <FileText className="h-4 w-4 text-primary" />
          Resume Builder
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
