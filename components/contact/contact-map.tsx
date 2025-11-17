import NetworkCanvas from "./network-canvas";

const ContactMap = () => {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Our Service Coverage
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl">
            With offices and facilities across North America and beyond
          </p>
        </div>
        <div className="relative h-[500px] overflow-hidden rounded-lg">
          {/* <NetworkCanvas /> */}
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
