import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, MapPin, TrendingUp, Users, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">About Delta Prime LLC</h1>
            <p className="text-xl leading-relaxed opacity-90">
              Leading the future of logistics through innovation, technology, and unwavering commitment to excellence
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
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To revolutionize global logistics by combining cutting-edge technology with exceptional service,
                  ensuring every shipment arrives on time, every time. We're committed to building lasting partnerships
                  through reliability, innovation, and transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                  <Eye className="text-accent-foreground" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To be the world's most trusted logistics partner, setting new standards in freight forwarding through
                  technological innovation, sustainable practices, and a customer-first approach that transforms supply
                  chains globally.
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">Our Story</h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded over 25 years ago, Delta Prime LLC began with a simple yet powerful vision: to transform the
                logistics industry through technology and innovation. What started as a small domestic trucking
                operation has evolved into a global freight forwarding powerhouse, serving clients in over 150
                countries.
              </p>

              <p>
                From the beginning, we recognized that the future of logistics would be driven by data and automation.
                While others relied on traditional methods, we invested heavily in developing proprietary software
                systems that optimize routes, predict delays, and provide real-time visibility into every shipment.
              </p>

              <p>
                Today, Delta Prime operates a fleet of over 500 modern vehicles, employs cutting-edge AI-powered
                logistics platforms, and maintains strategic partnerships with carriers and customs brokers worldwide.
                Our technology stack includes real-time GPS tracking, predictive analytics, automated customs
                documentation, and integrated supply chain management tools.
              </p>

              <p>
                But technology is only part of our story. At our core, we're a people-first company. Our team of
                experienced logistics professionals, certified drivers, and customer service specialists work tirelessly
                to ensure every shipment receives the attention it deserves. We've built our reputation on reliability,
                transparency, and going the extra mile for our clients.
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
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Global Reach, Local Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Headquartered in the USA with operations spanning the globe
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-2">USA Headquarters</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Strategic locations across North America for rapid domestic and international shipping
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="text-accent mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Global Partners</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Trusted partnerships with carriers and customs brokers in 150+ countries
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Industry Leaders</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Award-winning service recognized by industry associations worldwide
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technology-Driven Excellence</h2>
            <p className="text-xl leading-relaxed opacity-90 mb-8">
              Our proprietary logistics platform uses machine learning algorithms to optimize routes, predict potential
              delays, and automate documentation. Real-time data analytics provide unprecedented visibility into your
              supply chain, while our mobile apps keep you connected 24/7.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Contact Us to Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
