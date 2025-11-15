import NumbersSection from "@/components/numbers-section";
import TrustedSection from "@/components/trusted-section";
import ServicesSection from "@/components/services-section";
import PropositionsSection from "@/components/propositions-section";
import ReliabilitySection from "@/components/reliability-section";
import ClientsSection from "@/components/clients-section";
import CtaSection from "@/components/cta-section";
import HeroSection from "@/components/hero-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Value Propositions */}
      <PropositionsSection />

      {/* By the Numbers */}
      <NumbersSection />

      <TrustedSection />

      {/* Services Preview */}
      <ServicesSection />

      {/* Reliability in Motion */}
      <ReliabilitySection />

      {/* Testimonials */}
      <ClientsSection />

      {/* Final CTA */}
      <CtaSection />
    </main>
  );
}
