import { Nav } from "@/components/shared/nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <Nav variant="bordered" />
      {children}
    </div>
  );
}
