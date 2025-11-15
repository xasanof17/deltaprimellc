import { Button } from "@/components/ui/button";
import { Star, Shield, Clock } from "lucide-react";
import { ShipperQuoteModal } from "@/components/shipper-quote-modal";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/in_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/40 to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-5 md:pb-20 min-h-[85vh] text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground mb-4 leading-tight drop-shadow-lg">
          DELTA PRIME LLC
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-6 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Reliable, safe, and efficient nationwide trucking solutions. We ensure
          your freight reaches its destination on time, every time — backed by
          modern equipment, professional drivers, and 24/7 support.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <Star className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              5-Star Service
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              Fully Insured
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">24/7 Support</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ShipperQuoteModal />
          <Link href="/about">
            <Button
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold w-full sm:w-auto"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
