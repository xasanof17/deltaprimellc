import NumbersSection from "@/components/home/numbers-section";
import TrustedSection from "@/components/home/trusted-section";
import ServicesSection from "@/components/services/services-section";
import PropositionsSection from "@/components/home/propositions-section";
import ReliabilitySection from "@/components/home/reliability-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import HeroSection from "@/components/home/hero-section";

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
      <TestimonialsSection />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
