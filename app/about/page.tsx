import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, MapPin, TrendingUp, Users, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              About Delta Prime LLC
            </h1>
            <p className="text-xl leading-relaxed opacity-90">
              Leading the future of logistics through innovation, technology,
              and unwavering commitment to excellence
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Target className="text-primary-foreground" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To revolutionize global logistics by combining cutting-edge
                  technology with exceptional service, ensuring every shipment
                  arrives on time, every time. We're committed to building
                  lasting partnerships through reliability, innovation, and
                  transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                  <Eye className="text-accent-foreground" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To be the world's most trusted logistics partner, setting new
                  standards in freight forwarding through technological
                  innovation, sustainable practices, and a customer-first
                  approach that transforms supply chains globally.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Our Story
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2020, Delta Prime LLC entered the trucking industry
                with a clear mission: to build a modern, technology-driven
                transportation company that delivers reliability, transparency,
                and exceptional service. What began with just a few trucks and a
                small team has quickly grown into one of the most trusted and
                fast-expanding carriers in the region.
              </p>

              <p>
                From the very beginning, we recognized that the future of
                trucking would be rooted in efficiency, data, and innovation.
                While many carriers continued using outdated systems, we
                invested early in advanced GPS tracking, automated dispatching
                tools, and performance analytics to ensure every shipment moves
                safely, efficiently, and on schedule
              </p>

              <p>
                Today, Delta Prime operates a fleet of over 500 vehicles,
                supported by a full in-house logistics and safety team, a modern
                repair facility, and dedicated driver support departments. Our
                commitment to proactive maintenance, smart routing, and
                real-time visibility allows us to provide dependable local,
                regional, and long-distance freight solutions across the United
                States.
              </p>

              <p>
                But above all, Delta Prime LLC is built around people. Our
                professional drivers, dispatchers, fleet managers, and customer
                service teams work around the clock to make sure every load
                receives the care and attention it deserves. We believe in doing
                things the right way — with integrity, accountability, and a
                focus on long-term relationships.
              </p>
              <p>
                In just a few years, our dedication to service, technology, and
                continuous improvement has earned us a reputation as a carrier
                that goes the extra mile. And we’re just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Global Reach */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                National Reach, Local Expertise
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Headquartered in Illinois with operations spanning all 48
                continental states.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Midwest Strength
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Proudly headquartered in Illinois with reliable trucking
                    operations across the entire United States.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="text-accent mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Coast-to-Coast Coverage
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    From major metro hubs to remote final-mile destinations, our
                    fleet provides dependable service across all 48 continental
                    states. Wherever your freight needs to go, we move it
                    safely, efficiently, and on time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Industry Leaders
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Known for reliability, safety, and modern equipment, Delta
                    Prime LLC is recognized as one of the fastest-growing
                    trucking companies in America.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <TrendingUp className="mx-auto mb-6" size={64} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technology-Driven Excellence
            </h2>
            <p className="text-xl leading-relaxed opacity-90 mb-8">
              Our proprietary logistics platform uses machine learning
              algorithms to optimize routes, predict potential delays, and
              automate documentation. Real-time data analytics provide
              unprecedented visibility into your supply chain, while our mobile
              apps keep you connected 24/7.
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
    </main>
  );
}
