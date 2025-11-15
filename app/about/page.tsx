import AboutCTA from "@/components/about/about-cta";
import MissionVisionSection from "@/components/about/mission-vision";
import NationalReach from "@/components/about/national-reach";
import OurStory from "@/components/about/our-story";
import PageHero from "@/components/page-hero";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      {/* <AboutHeroSection /> */}
      <PageHero
        title="About Delta Prime LLC"
        subtitle="Leading the future of logistics with technology, precision, and performance"
      />

      {/* Mission & Vision */}
      <MissionVisionSection />

      {/* Our Story */}
      <OurStory />

      {/* Location & Global Reach */}
      <NationalReach />

      {/* Technology & Innovation */}
      <AboutCTA />
    </main>
  );
}
