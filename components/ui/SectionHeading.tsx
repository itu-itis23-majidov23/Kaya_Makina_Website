type Props = {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export default function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  dark = false,
}: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker && (
        <p
          className={`font-display text-sm font-semibold uppercase tracking-[0.25em] ${dark ? "text-brand-400" : "text-brand-600"}`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-3xl font-semibold uppercase leading-tight tracking-tight lg:text-5xl ${dark ? "text-white" : "text-ink-900"}`}
      >
        {title}
      </h2>
      <div
        aria-hidden
        className={`mt-4 h-1 w-16 bg-brand-500 ${center ? "mx-auto" : ""}`}
      />
      {lead && (
        <p className={`mt-5 text-base lg:text-lg ${dark ? "text-ink-300" : "text-ink-500"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
