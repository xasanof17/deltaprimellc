import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Gauge, Shield, Wifi, MapPin, BarChart3, CheckCircle, Award } from "lucide-react"
import Link from "next/link"

export default function FleetPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Fleet & Technology</h1>
            <p className="text-xl leading-relaxed opacity-90">
              Modern vehicles powered by cutting-edge logistics technology
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Modern Fleet</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Delta Prime operates a fleet of over 250 state-of-the-art vehicles, including dry vans, refrigerated
                trucks, flatbeds, and specialized equipment. Every vehicle is maintained to the highest standards and
                equipped with advanced safety and tracking technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Latest Models</h3>
                    <p className="text-muted-foreground">
                      Average fleet age under 5 years for reliability and efficiency
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Eco-Friendly</h3>
                    <p className="text-muted-foreground">
                      Fuel-efficient engines and hybrid options reducing carbon footprint
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Specialized Equipment</h3>
                    <p className="text-muted-foreground">
                      Temperature-controlled, flatbed, and oversized cargo capabilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <img src="/modern-semi-truck-fleet-in-logistics-yard.jpg" alt="Delta Prime fleet" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Real-Time Tracking Dashboard</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete visibility and control over your shipments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">GPS Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time location updates with geofencing alerts and route optimization
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Wifi className="text-accent-foreground" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">IoT Sensors</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Temperature, humidity, and shock monitoring for sensitive cargo
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Predictive insights and performance metrics for data-driven decisions
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Gauge className="text-accent-foreground" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Performance Monitoring</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vehicle diagnostics and maintenance scheduling for optimal uptime
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced security systems with tamper alerts and cargo protection
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Truck className="text-accent-foreground" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Driver Apps</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mobile tools for drivers with digital documentation and communication
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety & Compliance */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Safety & Compliance</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Industry-leading safety standards and regulatory compliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 border-primary">
                <CardContent className="p-8">
                  <Shield className="text-primary mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-4">Safety First</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent shrink-0 mt-1" size={18} />
                      <span>Comprehensive driver training and certification programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent shrink-0 mt-1" size={18} />
                      <span>Advanced driver assistance systems (ADAS) in all vehicles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent shrink-0 mt-1" size={18} />
                      <span>Regular safety audits and vehicle inspections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent shrink-0 mt-1" size={18} />
                      <span>24/7 emergency response and support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent">
                <CardContent className="p-8">
                  <Award className="text-accent mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-4">Compliance Excellence</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary shrink-0 mt-1" size={18} />
                      <span>DOT, FMCSA, and international regulatory compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary shrink-0 mt-1" size={18} />
                      <span>ISO 9001 certified quality management systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary shrink-0 mt-1" size={18} />
                      <span>C-TPAT and TSA security certifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary shrink-0 mt-1" size={18} />
                      <span>Environmental compliance and sustainability initiatives</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Experience the Technology Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            See how our fleet and technology can transform your logistics operations
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6"
            >
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
