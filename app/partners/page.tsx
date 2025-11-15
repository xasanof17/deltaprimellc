import PageHero from "@/components/page-hero";
import TrustedSection from "@/components/home/trusted-section";
import WhyPartnerWithUs from "@/components/our-partners/why-partner-withus";
import PartnershipBenefits from "@/components/our-partners/partnership-benefits";
import PartnerTypes from "@/components/our-partners/partner-types";
import OurPartnersCTA from "@/components/our-partners/our-partners-cta";

export default function PartnersPage() {
  return (
    <main className="min-h-screen pt-20">
      <PageHero
        title="Partner With Delta Prime"
        subtitle="Partner with Delta Prime and grow your business with dependable
              freight solutions, real-time visibility, and dedicated support
              teams."
      />

      <TrustedSection />

      {/* Why Partner With Us */}
      <WhyPartnerWithUs />

      {/* Partnership Benefits */}
      <PartnershipBenefits />

      {/* Partner Types */}
      <PartnerTypes />

      {/* CTA Section */}
      <OurPartnersCTA />
    </main>
  );
}
