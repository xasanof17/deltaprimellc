import { ShipperQuoteModal } from "../shipper-quote-modal";

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Ready to Transform Your Logistics?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
          Get a custom quote today and experience the Delta Prime difference
        </p>
        <ShipperQuoteModal />
      </div>
    </section>
  );
};

export default CtaSection;
