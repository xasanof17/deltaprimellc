import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const PartnerTypes = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Partnership Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We collaborate with trusted partners across the U.S. freight and
            logistics industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Shippers & Businesses
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Work with Delta Prime to move your freight with safe, reliable,
                coast-to-coast trucking services.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  Consistent nationwide coverage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  Real-time tracking & communication
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  Flexible local, regional, and long-haul options{" "}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Brokers & Logistics Providers
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Partner with us for dependable capacity, strong communication,
                and on-time performance.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  Steady, high-volume capacity
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  Fast, transparent payment terms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  24/7 operations & dispatch support
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Carriers & Owner-Operators{" "}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Join our carrier network and access stable lanes, fair rates,
                and professional support.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  Dedicated lanes and steady freight
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  Fuel & route optimization support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={16} />
                  Safety-first operations and compliance
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnerTypes;
