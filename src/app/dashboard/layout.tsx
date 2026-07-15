import Link from "next/link";
import { LogoutButton } from "@/components/shared/logout-button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <header className="border-b">
        <div className="mx-auto flex items-center justify-between max-w-3xl px-6 py-4">
          <Link href="/dashboard" className="text-sm font-semibold">
            Resume Builder
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
