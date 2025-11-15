import { Card, CardContent } from "@/components/ui/card";
import {
  Truck,
  DollarSign,
  Heart,
  Shield,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";
import { DriverApplicationModal } from "@/components/modals/driver-application-modal";

export default function DriversPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
                Drive With Delta Prime
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Join a professional team that values your experience, respects
                your time, and rewards your hard work. Enjoy steady miles,
                modern equipment, and reliable support from a company committed
                to driver success.
              </p>
              <DriverApplicationModal />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/professional-truck-driver-standing-in-front-of-mod.jpg"
                alt="Professional driver"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Drive With Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Drive With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Competitive Pay
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Top industry pay with performance bonuses and regular rate increases.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Truck className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Modern Fleet
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Late-model trucks equipped with advanced safety features, comfort packages, and reliable maintenance support.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Heart className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Work-Life Balance
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Flexible schedules, guaranteed home time options, and routes built around your lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Shield className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Supportive Team
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  24/7 dispatch assistance, friendly driver managers, and a company culture built on respect.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Award className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Driver Recognition & Rewards
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monthly bonuses, performance awards, and recognition programs that honor top drivers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Users className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Reliable Weekly Settlements
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get paid on time, every time — with fast weekly settlements and transparent pay statements you can trust.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits & Compensation */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Compensation & Benefits
              </h2>
              <div className="space-y-4">
                {[
                  "Starting pay: $95000+ annually",
                  "Performance and safety bonuses",
                  "Paid orientation and training",
                  "Referral bonuses up to $500",
                  "Fuel card and maintenance covered",
                  "Per diem and layover pay",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-accent shrink-0 mt-1"
                      size={24}
                    />
                    <p className="text-lg text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Requirements
              </h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="text-primary shrink-0 mt-1"
                        size={20}
                      />
                      <span>Valid Class A CDL license</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="text-primary shrink-0 mt-1"
                        size={20}
                      />
                      <span>Minimum 1 year of verifiable OTR experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="text-primary shrink-0 mt-1"
                        size={20}
                      />
                      <span>Clean driving record (no major violations)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="text-primary shrink-0 mt-1"
                        size={20}
                      />
                      <span>Pass DOT physical and drug screening</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="text-primary shrink-0 mt-1"
                        size={20}
                      />
                      <span>23 years of age or older</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        className="text-primary shrink-0 mt-1"
                        size={20}
                      />
                      <span>Ability to operate manual transmission</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>New to trucking?</strong> Ask about our CDL
                      training program for qualified candidates.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Drivers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from the professionals who drive for us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mike Johnson",
                role: "OTR Driver, 3 years",
                quote:
                  "Best company I've worked for. The equipment is top-notch, dispatch is always helpful, and I'm home every other weekend like they promised.",
              },
              {
                name: "Sarah Martinez",
                role: "Regional Driver, 5 years",
                quote:
                  "Delta Prime treats drivers with respect. The pay is competitive, benefits are excellent, and they actually care about work-life balance.",
              },
              {
                name: "David Chen",
                role: "Dedicated Route Driver, 2 years",
                quote:
                  "Consistent miles, predictable schedule, and great support. I finally found a company where I can build a long-term career.",
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join the Delta Prime family today and experience what it's like to
            drive for a company that puts drivers first
          </p>
          <DriverApplicationModal />
        </div>
      </section>
    </main>
  );
}
