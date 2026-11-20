import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CTABand from "@/components/home/CTABand";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { MACHINES } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "equipment");
}

export default async function EquipmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("equipment");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
        image="/images/yard.jpg"
        position="30% 60%"
      />

      {/* Machine types */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {MACHINES.map(({ id, icon: Icon }) => {
                const services = t.raw(`categories.${id}.services`) as string[];
                return (
                  <li key={id} className="flex flex-col bg-surface p-7 lg:p-9">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md border border-line bg-bg text-brand">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h2 className="mt-6 font-display text-2xl font-bold tracking-[-0.02em]">
                      {t(`categories.${id}.name`)}
                    </h2>
                    <p className="mt-3 flex-1 leading-relaxed text-muted">
                      {t(`categories.${id}.description`)}
                    </p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {services.map((service) => (
                        <li
                          key={service}
                          className="rounded border border-line bg-bg px-2.5 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted"
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Makes */}
      <section className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-20">
          <Reveal>
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-lg border border-line">
                <Image
                  src="/images/yard.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 60vw, 32vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 overflow-hidden rounded-lg border border-line">
                <Image
                  src="/images/yard-crane.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover object-[50%_25%]"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              kicker={t("brands.kicker")}
              title={t("brands.title")}
              lead={t("brands.text")}
            />
            <p className="mt-6 border-l-2 border-brand pl-4 text-sm leading-relaxed text-muted">
              {t("brands.note")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Not listed? */}
      <section className="py-16 lg:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-line bg-surface p-7 sm:flex-row sm:items-center lg:p-9">
              <p className="max-w-2xl text-lg leading-relaxed text-fg">{t("note")}</p>
              <Button href="/contact" className="shrink-0">
                {tNav("contact")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
