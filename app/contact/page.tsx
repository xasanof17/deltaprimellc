import ContactInfoCards from "@/components/contact/contact-info-cards";
import ContactForm from "@/components/contact/contact-form";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactMap from "@/components/contact/contact-map";
import CTAContact from "@/components/contact/cta-contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-balance">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Have questions? Need a quote? Our team is here to help you find the
            perfect logistics solution
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Info Cards */}
            <ContactInfoCards />

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <ContactMap />

      {/* CTA Section */}
      <CTAContact />
    </main>
  );
}
