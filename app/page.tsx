import Link from 'next/link';
import { Header } from "@/components/header";
import { Features } from "@/components/features";
import { LandingHero } from "@/components/landing-hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <LandingHero />
        <Features />
      </main>
    </div>
  );
}