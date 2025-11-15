import { CheckCircle } from "lucide-react";

const PartnershipBenefits = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Partnership Benefits
            </h2>
            <div className="space-y-4">
              {[
                "Access to real-time GPS tracking and shipment visibility",
                "Dedicated account and dispatch support 24/7",
                "Consistent freight opportunities across all 48 states",
                "Modern, well-maintained fleet with advanced safety technology",
                "Transparent pricing and long-term partnership agreements",
                "Reliable, on-time delivery backed by performance analytics",
                "Driver and equipment safety compliance built into every load",
                "Priority access to capacity during peak seasons",
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
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img
              src="/logistics-partnership-handshake-business-meeting.jpg"
              alt="Partnership"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;
