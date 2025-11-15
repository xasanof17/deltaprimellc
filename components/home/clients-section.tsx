import { TestimonialsCarousel } from "../animations/testimonials-carousel";

const ClientsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by businesses worldwide
          </p>
        </div>
        <TestimonialsCarousel />
      </div>
    </section>
  );
};

export default ClientsSection;
