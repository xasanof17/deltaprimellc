import WhyShipWithUs from "@/components/shippers/why-ship-withus";
import CTAShippers from "@/components/shippers/cta-shippers";
import HeroShippersSection from "@/components/shippers/hero-shippers";

export default function ShippersPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroShippersSection />

      {/* Why Ship With Us */}
      <WhyShipWithUs />

      {/* CTA Section */}
      <CTAShippers />
    </main>
  );
}
