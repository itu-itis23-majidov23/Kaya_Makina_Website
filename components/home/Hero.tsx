import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import HazardDivider from "@/components/ui/HazardDivider";

export default function Hero() {
  const t = useTranslations("home.hero");
  const tNav = useTranslations("nav");

  return (
    <section className="relative flex min-h-[82vh] items-center bg-ink-950 text-white">
      <Image
        src="/images/hero-home.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/30"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
          {t("kicker")}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <div aria-hidden className="mt-6 h-1.5 w-24 bg-brand-500" />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" size="lg">
            {tNav("requestService")}
          </Button>
          <Button href="/services" variant="outline" size="lg">
            {t("secondary")}
          </Button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <HazardDivider />
      </div>
    </section>
  );
}
