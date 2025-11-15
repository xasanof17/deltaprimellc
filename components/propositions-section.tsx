import { LocateFixedIcon, MapIcon, Truck } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const PropositionsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Global Network */}
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <MapIcon className="text-primary-foreground" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Nationwide Coverage
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Reliable freight delivery across the entire United States with a
                strong network of shippers, warehouses, and distribution centers
                ensuring on-time deliveries coast to coast.
              </p>
            </CardContent>
          </Card>

          {/* Smart Technology */}
          <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <LocateFixedIcon className="text-accent-foreground" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Smart Dispatch & Tracking Technology
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered dispatching, real-time GPS tracking, ELD integration,
                and predictive analytics that keep you updated and ensure every
                load stays on schedule.
              </p>
            </CardContent>
          </Card>

          {/* Dedicated Fleet */}
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-primary-foreground" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Dedicated Fleet & Professional Drivers
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A modern, well-maintained fleet operated by experienced,
                safety-certified drivers committed to delivering exceptional and
                damage-free service every time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PropositionsSection;
