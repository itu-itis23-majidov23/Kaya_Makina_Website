import HazardDivider from "@/components/ui/HazardDivider";

// Dark title band used at the top of every inner page.
export default function PageHeader({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative bg-ink-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
          {kicker}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div aria-hidden className="mt-5 h-1 w-20 bg-brand-500" />
        {lead && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            {lead}
          </p>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <HazardDivider />
      </div>
    </section>
  );
}
