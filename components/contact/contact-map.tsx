import NetworkCanvas from "./network-canvas";

export default function ContactMap() {
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Our Service Coverage
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base md:text-lg">
            Coast-to-coast coverage across the United States, with key hubs in
            major freight markets.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div
            style={{ aspectRatio: "1003 / 603" }}
            className="bg-background relative mx-auto aspect-[1003/603] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm"          >
            <div className="h-[420px] w-full rounded-xl border border-slate-100 bg-[#f8fafc] sm:h-[500px] lg:h-[600px]">
              <NetworkCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
