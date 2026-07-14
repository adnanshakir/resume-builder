import Link from "next/link";
import { LogoutButton } from "@/components/shared/logout-button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <Link href="/dashboard" className="text-sm font-semibold">Resume Builder</Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>
      {children}
    </div>
  );
}