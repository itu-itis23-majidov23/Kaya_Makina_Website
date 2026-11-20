import Image from "next/image";

// Dark-background lockup: the KM mark from the company logo plus the
// wordmark. The name is typed in capitals on purpose — "MAKİNA" keeps its
// dotted İ in every locale, exactly as it is drawn in the logo.
export default function Logo({
  tagline,
  size = "md",
}: {
  tagline?: string;
  size?: "md" | "sm";
}) {
  const h = size === "md" ? 38 : 34;
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/logo-mark.png"
        alt=""
        width={Math.round((h * 412) / 320)}
        height={h}
        priority={size === "md"}
        className="shrink-0"
      />
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display text-[1.0625rem] font-extrabold tracking-[0.04em] text-fg">
          KAYA <span className="text-brand">MAKİNA</span>
        </span>
        {tagline && (
          <span className="mt-1.5 hidden whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.16em] text-dim sm:block lg:hidden xl:block">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
