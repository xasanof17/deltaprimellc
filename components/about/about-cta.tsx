import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const AboutCTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp className="mx-auto mb-6" size={64} />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technology-Driven Excellence
          </h2>
          <p className="text-xl leading-relaxed opacity-90 mb-8">
            Our proprietary logistics platform uses machine learning algorithms
            to optimize routes, predict potential delays, and automate
            documentation. Real-time data analytics provide unprecedented
            visibility into your supply chain, while our mobile apps keep you
            connected 24/7.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Contact Us to Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
