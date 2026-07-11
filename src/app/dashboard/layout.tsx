import Link from "next/link";
import { LogoutButton } from "@/components/shared/logout-button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <Link href="/dashboard" className="text-sm font-semibold">Resume Builder</Link>
        <LogoutButton />
      </header>
      {children}
    </div>
  );
}