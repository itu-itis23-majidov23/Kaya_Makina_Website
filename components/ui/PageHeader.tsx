import type { CSSProperties } from "react";
import Image from "next/image";

// Title band at the top of every inner page. The optional workshop photo
// sits behind the right-hand side and fades into the surface colour.
export default function PageHeader({
  kicker,
  title,
  lead,
  image,
  position = "50% 50%",
}: {
  kicker: string;
  title: string;
  lead?: string;
  image?: string;
  position?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-surface">
      {image && (
        <div aria-hidden className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 62vw"
            className="object-cover opacity-30 lg:opacity-70"
            style={{ objectPosition: position }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/75 to-surface/20" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface/80 to-transparent" />
        </div>
      )}
      <div className="shell py-16 sm:py-20 lg:py-28">
        <p className="kicker rise">{kicker}</p>
        <h1
          className="rise mt-4 max-w-[18ch] font-display text-[clamp(2.25rem,1.4rem+3.6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
          style={{ "--d": "70ms" } as CSSProperties}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="rise mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ "--d": "140ms" } as CSSProperties}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
