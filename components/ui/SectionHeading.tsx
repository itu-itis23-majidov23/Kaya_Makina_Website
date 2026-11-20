type Props = {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** Heading level — section headings are h2 unless nested. */
  as?: "h2" | "h3";
};

export default function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
}: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {kicker && <p className="kicker">{kicker}</p>}
      <Tag className="mt-3 font-display text-[clamp(1.75rem,1.25rem+2vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-fg">
        {title}
      </Tag>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-muted lg:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
