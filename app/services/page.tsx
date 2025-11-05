import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Truck, Cpu, FileCheck, Package, TrendingUp, CheckCircle, MapPin, Route, Globe2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    icon: MapPin,
    title: "Local Trucking",
    subtitle: "Fast, Reliable Delivery in Your Area",
    description:
      "Our local trucking services are designed for short-distance transportation — typically within the same city or surrounding counties. We specialize in same-day and next-day deliveries, ensuring your freight reaches its destination quickly and safely. Perfect for businesses that need consistent, on-time local distribution without the hassle.",
    badge: "Same Day",
    image: "/card1.jpg",
  },
  {
    icon: Route,
    title: "Regional Trucking",
    subtitle: "Dependable Service Across the Region",
    description:
      "With our regional trucking solutions, your freight moves efficiently within a multi-state area. We operate across key regional hubs, balancing speed and cost-effectiveness to keep your supply chain strong. Our drivers know the roads, routes, and regulations — ensuring on-time delivery and exceptional service every mile of the way.",
    badge: "Flexible",
    image: "/card2.jpg",
  },
  {
    icon: Globe2,
    title: "Long Distance Trucking",
    subtitle: "Nationwide Freight Solutions You Can Trust",
    description:
      "When your business needs to move freight across states or coast-to-coast, our long-distance trucking services deliver unmatched reliability. Backed by experienced drivers, a modern fleet, and real-time tracking, we make sure your cargo arrives safely, securely, and on schedule — no matter the distance.",
    badge: "Coast to Coast",
    image: "/card3.jpg",
  },
  {
    icon: Globe,
    title: "International Freight Forwarding",
    description:
      "Comprehensive air, sea, and land freight solutions connecting you to markets worldwide. Our global network ensures seamless cross-border shipping with competitive rates and reliable transit times.",
    features: [
      "Air freight express & economy",
      "Ocean freight FCL & LCL",
      "Multimodal transportation",
      "Door-to-door delivery",
    ],
  },
  {
    icon: Truck,
    title: "Domestic Trucking",
    description:
      "Reliable nationwide transportation services with our modern fleet of trucks. From LTL to FTL, we handle shipments of all sizes with precision and care.",
    features: [
      "Full truckload (FTL)",
      "Less than truckload (LTL)",
      "Expedited shipping",
      "Temperature-controlled transport",
    ],
  },
  {
    icon: Cpu,
    title: "Supply Chain Automation",
    description:
      "Transform your logistics operations with our AI-powered supply chain management platform. Real-time visibility, predictive analytics, and automated workflows optimize your entire supply chain.",
    features: [
      "Real-time tracking & visibility",
      "Predictive analytics",
      "Automated documentation",
      "API integrations",
    ],
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description:
      "Expert customs brokerage services ensuring smooth clearance of your international shipments. Our team handles all documentation, compliance, and regulatory requirements.",
    features: [
      "Import/export documentation",
      "Duty & tax calculation",
      "Compliance management",
      "Regulatory consulting",
    ],
  },
  {
    icon: Package,
    title: "Dedicated Fleet Solutions",
    description:
      "Custom fleet management tailored to your business needs. Get dedicated vehicles and drivers for consistent, reliable service that scales with your operations.",
    features: ["Dedicated trucks & drivers", "Flexible scheduling", "Custom routing", "Performance reporting"],
  },
  {
    icon: TrendingUp,
    title: "Real-Time Tracking & Analytics",
    description:
      "Stay informed with our advanced tracking platform. Monitor shipments in real-time, receive proactive alerts, and access detailed analytics to optimize your logistics strategy.",
    features: ["GPS tracking 24/7", "Automated notifications", "Performance dashboards", "Historical data analysis"],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Our Services</h1>
            <p className="text-xl leading-relaxed opacity-90">
              Comprehensive transportation solutions tailored to your business needs
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, idx) => (
              <Card
                key={idx}
                className="overflow-hidden border hover:border-primary transition-all duration-300 hover:shadow-lg group bg-card"
              >
                {service.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-semibold">
                      {service.badge}
                    </div>
                    <div className="absolute top-3 right-3 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <service.icon className="text-primary-foreground" size={20} />
                    </div>
                  </div>
                )}
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold text-foreground mb-1">{service.title}</h3>
                  {service.subtitle && <p className="text-xs font-semibold text-primary mb-3">{service.subtitle}</p>}
                  <p className="text-muted-foreground leading-relaxed text-sm mb-4">{service.description}</p>
                  {service.features ? (
                    <div className="space-y-2">
                      {service.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-center gap-2">
                          <CheckCircle className="text-accent shrink-0" size={16} />
                          <span className="text-xs text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                      >
                        Learn More
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Ship with Delta Prime LLC?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Let's discuss how our trucking services can streamline your logistics operations
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6"
            >
              Get a Quote
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
