import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Gauge,
  Shield,
  Wifi,
  MapPin,
  BarChart3,
  CheckCircle,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function FleetPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="from-primary to-primary/80 text-primary-foreground relative bg-linear-to-r py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl">
              Fleet & Technology
            </h1>
            <p className="text-xl leading-relaxed opacity-90">
              Modern vehicles powered by cutting-edge logistics technology
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Overview */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground mb-6 text-4xl font-bold">
                Our Modern Fleet
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Delta Prime operates a fleet of over 250 state-of-the-art
                vehicles, including dry vans, refrigerated trucks, flatbeds, and
                specialized equipment. Every vehicle is maintained to the
                highest standards and equipped with advanced safety and tracking
                technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    className="text-accent mt-1 shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="text-foreground mb-1 font-bold">
                      Latest Models
                    </h3>
                    <p className="text-muted-foreground">
                      Average fleet age under 5 years for reliability and
                      efficiency
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle
                    className="text-accent mt-1 shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="text-foreground mb-1 font-bold">
                      Eco-Friendly
                    </h3>
                    <p className="text-muted-foreground">
                      Fuel-efficient engines and hybrid options reducing carbon
                      footprint
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle
                    className="text-accent mt-1 shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="text-foreground mb-1 font-bold">
                      Specialized Equipment
                    </h3>
                    <p className="text-muted-foreground">
                      Temperature-controlled, flatbed, and oversized cargo
                      capabilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden rounded-lg shadow-2xl">
              <img
                src="/modern-semi-truck-fleet-in-logistics-yard.jpg"
                alt="Delta Prime fleet"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Real-Time Tracking Dashboard
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Complete visibility and control over your shipments
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="bg-primary mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                  <MapPin className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold">
                  GPS Tracking
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time location updates with geofencing alerts and route
                  optimization
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="bg-accent mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                  <Wifi className="text-accent-foreground" size={28} />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold">
                  IoT Sensors
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Temperature, humidity, and shock monitoring for sensitive
                  cargo
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="bg-primary mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                  <BarChart3 className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold">
                  Analytics
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Predictive insights and performance metrics for data-driven
                  decisions
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="bg-accent mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                  <Gauge className="text-accent-foreground" size={28} />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold">
                  Performance Monitoring
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vehicle diagnostics and maintenance scheduling for optimal
                  uptime
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="bg-primary mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                  <Shield className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold">
                  Security
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced security systems with tamper alerts and cargo
                  protection
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="bg-accent mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                  <Truck className="text-accent-foreground" size={28} />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold">
                  Driver Apps
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mobile tools for drivers with digital documentation and
                  communication
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety & Compliance */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
                Safety & Compliance
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Industry-leading safety standards and regulatory compliance
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="border-primary border-2">
                <CardContent className="p-8">
                  <Shield className="text-primary mb-4" size={48} />
                  <h3 className="text-foreground mb-4 text-2xl font-bold">
                    Safety First
                  </h3>
                  <ul className="text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="text-accent mt-1 shrink-0"
                        size={18}
                      />
                      <span>
                        Comprehensive driver training and certification programs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="text-accent mt-1 shrink-0"
                        size={18}
                      />
                      <span>
                        Advanced driver assistance systems (ADAS) in all
                        vehicles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="text-accent mt-1 shrink-0"
                        size={18}
                      />
                      <span>Regular safety audits and vehicle inspections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="text-accent mt-1 shrink-0"
                        size={18}
                      />
                      <span>24/7 emergency response and support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-accent border-2">
                <CardContent className="p-8">
                  <Award className="text-accent mb-4" size={48} />
                  <h3 className="text-foreground mb-4 text-2xl font-bold">
                    Compliance Excellence
                  </h3>
                  <ul className="text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="text-primary mt-1 shrink-0"
                        size={18}
                      />
                      <span>
                        DOT, FMCSA, and international regulatory compliance
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="text-primary mt-1 shrink-0"
                        size={18}
                      />
                      <span>ISO 9001 certified quality management systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="text-primary mt-1 shrink-0"
                        size={18}
                      />
                      <span>C-TPAT and TSA security certifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="text-primary mt-1 shrink-0"
                        size={18}
                      />
                      <span>
                        Environmental compliance and sustainability initiatives
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-balance md:text-5xl">
            Experience the Technology Difference
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed opacity-90">
            See how our fleet and technology can transform your logistics
            operations
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold"
            >
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
