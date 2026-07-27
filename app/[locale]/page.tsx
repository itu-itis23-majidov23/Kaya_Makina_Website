import type { Metadata } from "next";
import Image from "next/image";
import { Award, Users, Wrench } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CTABand from "@/components/home/CTABand";
import Hero from "@/components/home/Hero";
import LogoStrip from "@/components/home/LogoStrip";
import ServiceCard from "@/components/home/ServiceCard";
import StatItem from "@/components/home/StatItem";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { MACHINES, SERVICES, STATS, WHY_US } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "home");
}

const ABOUT_ICONS = [
  { id: "experience", icon: Award },
  { id: "expertise", icon: Wrench },
  { id: "customer", icon: Users },
] as const;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Hero />

      {/* About intro */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="clip-corner-lg relative aspect-[4/3]">
              <Image
                src="/images/about-workshop.jpg"
                alt={t("about.title")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-brand-500 px-5 py-3 font-display text-sm font-bold uppercase tracking-widest text-ink-950">
                {t("about.badge")}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              kicker={t("about.kicker")}
              title={t("about.title")}
              lead={t("about.text")}
            />
            <ul className="mt-8 space-y-4">
              {ABOUT_ICONS.map(({ id, icon: Icon }) => (
                <li key={id} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink-900 text-brand-500">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold uppercase tracking-wide text-ink-900">
                      {t(`about.points.${id}.title`)}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-500">
                      {t(`about.points.${id}.text`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/about" variant="outline-dark">
                {t("about.cta")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              kicker={t("services.kicker")}
              title={t("services.title")}
              lead={t("services.lead")}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 100}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Machines we service */}
      <section className="bg-ink-900 py-16 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              dark
              align="center"
              kicker={t("machines.kicker")}
              title={t("machines.title")}
              lead={t("machines.lead")}
            />
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {MACHINES.map(({ id, icon: Icon }, i) => (
              <li key={id}>
                <Reveal delay={i * 60} className="h-full">
                  <div className="flex h-full flex-col items-center gap-3 border border-white/10 bg-white/5 px-4 py-8 text-center transition-colors hover:border-brand-500/60">
                    <Icon className="h-9 w-9 text-brand-500" aria-hidden />
                    <span className="font-display text-sm font-semibold uppercase tracking-wider">
                      {t(`machines.items.${id}`)}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              kicker={t("whyUs.kicker")}
              title={t("whyUs.title")}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map(({ id, icon: Icon }, i) => (
              <Reveal key={id} delay={(i % 3) * 100}>
                <div className="clip-corner h-full bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center bg-brand-500 text-ink-950">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-ink-900">
                    {t(`whyUs.points.${id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {t(`whyUs.points.${id}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink-950 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map(({ id, value }, i) => (
            <Reveal key={id} delay={i * 80}>
              <StatItem value={value} label={t(`stats.${id}`)} />
            </Reveal>
          ))}
        </div>
      </section>

      <LogoStrip />
      <CTABand />
    </>
  );
}
