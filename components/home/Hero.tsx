import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { PLATE } from "@/lib/content";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");

  return (
    <section className="relative isolate overflow-hidden">
      {/* The real workshop hall — overhead crane, engines on stands */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="settle object-cover object-[52%_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,rgb(11_12_13/0.96)_0%,rgb(11_12_13/0.82)_36%,rgb(11_12_13/0.34)_70%,rgb(11_12_13/0.5)_100%)]" />
        {/* On phones the copy spans the full width, so darken evenly */}
        <div className="absolute inset-0 bg-bg/45 sm:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </div>

      <div className="shell flex min-h-[min(90svh,56rem)] flex-col justify-end pb-8 pt-28 sm:pb-10 lg:pt-36">
        <p className="kicker rise">{t("hero.kicker")}</p>
        <h1
          className="rise mt-5 max-w-[17ch] font-display text-[clamp(2.375rem,1.2rem+5.2vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
          style={delay(80)}
        >
          {t("hero.title")}
        </h1>
        <p
          className="rise mt-6 max-w-[38rem] text-base leading-relaxed text-fg/80 sm:text-lg"
          style={delay(160)}
        >
          {t("hero.subtitle")}
        </p>
        <div className="rise mt-9 flex flex-wrap gap-3" style={delay(240)}>
          <Button href="/contact" size="lg">
            {tNav("requestService")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </Button>
          <Button href="/services" variant="outline" size="lg">
            {t("hero.secondary")}
          </Button>
        </div>

        {/* Data plate: what the workshop is, stated the way a machine's
            nameplate states its ratings — label above, value below. */}
        <dl
          className="rise mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          style={delay(340)}
        >
          {PLATE.map((id) => (
            <div key={id} className="bg-surface/95 px-5 py-4 lg:px-6 lg:py-5">
              <dt className="label">{t(`plate.items.${id}.label`)}</dt>
              <dd className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-fg">
                {t(`plate.items.${id}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
