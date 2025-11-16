import NetworkCanvas from "./network-canvas";

const ContactMap = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Service Coverage
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            With offices and facilities across North America and beyond
          </p>
        </div>
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          {/* <NetworkCanvas /> */}
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
