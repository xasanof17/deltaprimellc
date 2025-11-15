import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const OurPartnersCTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Ready to Partner With Us?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
          Join our network of successful partners and take your logistics
          business to the next level
        </p>
        <Link href="/contact">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6"
          >
            Contact Us Today <ArrowRight className="ml-2" size={20} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default OurPartnersCTA;
