import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CTABand from "@/components/home/CTABand";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
      />

      {SERVICES.map((service, i) => {
        const Icon = service.icon;
        const bullets = t.raw(`items.${service.id}.bullets`) as string[];
        const even = i % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className={even ? "bg-paper" : "bg-white"}
          >
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
              <Reveal className={even ? "" : "lg:order-2"}>
                <div className="clip-corner-lg relative aspect-[3/2]">
                  <Image
                    src={service.image}
                    alt={t(`items.${service.id}.title`)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={100} className={even ? "" : "lg:order-1"}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-brand-500 text-ink-950">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink-900 sm:text-3xl">
                    {t(`items.${service.id}.title`)}
                  </h2>
                </div>
                <p className="mt-5 leading-relaxed text-ink-500">
                  {t(`items.${service.id}.description`)}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-l-2 border-brand-500 bg-white/60 py-2 pl-4 text-sm text-ink-500">
                  <span className="font-display font-semibold uppercase tracking-wider text-ink-700">
                    {t("equipmentLabel")}:
                  </span>{" "}
                  {t(`items.${service.id}.equipment`)}
                </p>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTABand />
    </>
  );
}
