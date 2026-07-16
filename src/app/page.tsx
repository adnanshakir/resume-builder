import { LandingHero } from "@/components/landing/landing-hero";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingFooter } from "@/components/landing/landing-footer";
import { Nav } from "@/components/shared/nav";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full select-none">
      <Nav />
      <LandingHero />
      <LandingFeatures />
      <LandingFooter />
    </div>
  );
}
