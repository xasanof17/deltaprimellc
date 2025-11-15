import WhyDriveWithUs from "@/components/drivers/why-drive-withus";
import CompensationBenefits from "@/components/drivers/compensation-benefits";
import DriverTestimonials from "@/components/drivers/driver-testimonials";
import CTADrivers from "@/components/drivers/cta-drivers";
import HeroDriversSection from "@/components/drivers/hero-drivers";

export default function DriversPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroDriversSection />

      {/* Why Drive With Us */}
      <WhyDriveWithUs />

      {/* Benefits & Compensation */}
      <CompensationBenefits />

      {/* Driver Testimonials */}
      <DriverTestimonials />

      {/* CTA Section */}
      <CTADrivers />
    </main>
  );
}
