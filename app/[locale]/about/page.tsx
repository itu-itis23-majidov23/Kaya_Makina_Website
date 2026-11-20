import type { Metadata } from "next";
import Image from "next/image";
import { Check, Package, Stethoscope, Wrench } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CTABand from "@/components/home/CTABand";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about");
}

const PILLARS = [
  { id: "repair", icon: Wrench },
  { id: "service", icon: Stethoscope },
  { id: "parts", icon: Package },
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const features = t.raw("workshop.features") as string[];

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
        image="/images/workshop-hall.jpg"
        position="50% 30%"
      />

      {/* Who we are */}
      <section className="py-20 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-20">
          <Reveal>
            <SectionHeading kicker={t("story.kicker")} title={t("story.title")} />
            <p className="mt-6 leading-relaxed text-muted">{t("story.p1")}</p>
            <p className="mt-4 leading-relaxed text-muted">{t("story.p2")}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-lg border border-line">
                <Image
                  src="/images/engine-hall.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 grid gap-4">
                <div className="relative overflow-hidden rounded-lg border border-line">
                  <Image
                    src="/images/block-liners.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover object-[78%_50%]"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg border border-line">
                  <Image
                    src="/images/diagnostics.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover object-[86%_50%]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three lines of work */}
      <section className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading kicker={t("pillars.kicker")} title={t("pillars.title")} />
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {PILLARS.map(({ id, icon: Icon }) => (
                <li key={id} className="bg-bg p-7 lg:p-9">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.015em]">
                    {t(`pillars.items.${id}.title`)}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {t(`pillars.items.${id}.text`)}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Workshop */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line sm:aspect-[21/9]">
              <Image
                src="/images/hero.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                kicker={t("workshop.kicker")}
                title={t("workshop.title")}
              />
            </Reveal>
            <Reveal delay={100}>
              <p className="leading-relaxed text-muted lg:pt-9">{t("workshop.text")}</p>
              <ul className="mt-7 space-y-3 border-t border-line pt-7">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[0.9375rem] leading-snug text-fg"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Goal */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="kicker">{t("goal.label")}</p>
            <p className="mt-5 max-w-[22ch] font-display text-[clamp(1.875rem,1.2rem+2.9vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.025em]">
              {t("goal.text")}
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
