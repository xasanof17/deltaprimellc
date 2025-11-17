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
      <section className="bg-primary text-primary-foreground py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-bold text-balance sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Get In Touch
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed opacity-90 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Have questions? Need a quote? Our team is here to help you find the
            perfect logistics solution
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
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
