import { ArrowRight, Clock, Globe, Package, Shield } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const ReliabilitySection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Reliability in <span className="text-accent">Motion</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
            We believe that every mile matters, and every delivery reflects our
            commitment to excellence. From local routes to long-distance hauls,
            we combine dependable service, professional drivers, and modern
            equipment to keep your business moving forward — safely and on time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="text-accent" size={24} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                5+
              </div>
              <div className="text-primary-foreground/70">Years Experience</div>
            </CardContent>
          </Card>

          <Card className="bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="text-accent" size={24} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                1.2K+
              </div>
              <div className="text-primary-foreground/70">Happy Clients</div>
            </CardContent>
          </Card>

          <Card className="bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-accent" size={24} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                99%
              </div>
              <div className="text-primary-foreground/70">On-Time Delivery</div>
            </CardContent>
          </Card>

          <Card className="bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-accent" size={24} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                A
              </div>
              <div className="text-primary-foreground/70">Safety Rating</div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg">
              Speak With an Expert <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReliabilitySection;
