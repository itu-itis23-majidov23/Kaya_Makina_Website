import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Eye, HardHat, Target, Users, Wrench } from "lucide-react";
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

const APPROACH_ICONS = [
  { id: "diagnostics", icon: Compass },
  { id: "parts", icon: Wrench },
  { id: "safety", icon: HardHat },
  { id: "transparency", icon: Users },
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
      />

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <SectionHeading kicker={t("story.kicker")} title={t("story.title")} />
            <p className="mt-6 leading-relaxed text-ink-500">{t("story.p1")}</p>
            <p className="mt-4 leading-relaxed text-ink-500">{t("story.p2")}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="clip-corner-lg relative aspect-[4/3]">
              <Image
                src="/images/service-maintenance.jpg"
                alt={t("story.title")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="clip-corner-lg h-full bg-ink-900 p-8 text-white lg:p-10">
              <span className="flex h-12 w-12 items-center justify-center bg-brand-500 text-ink-950">
                <Target className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold uppercase tracking-wide">
                {t("mission.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-300">{t("mission.text")}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="clip-corner-lg h-full bg-brand-500 p-8 text-ink-950 lg:p-10">
              <span className="flex h-12 w-12 items-center justify-center bg-ink-950 text-brand-500">
                <Eye className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold uppercase tracking-wide">
                {t("vision.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-800">{t("vision.text")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engineering approach */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              kicker={t("approach.kicker")}
              title={t("approach.title")}
              lead={t("approach.lead")}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH_ICONS.map(({ id, icon: Icon }, i) => (
              <Reveal key={id} delay={i * 90}>
                <div className="clip-corner h-full bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center bg-ink-900 text-brand-500">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-display text-4xl font-bold text-ink-100">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-ink-900">
                    {t(`approach.points.${id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {t(`approach.points.${id}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-ink-900 py-16 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              dark
              align="center"
              kicker={t("team.kicker")}
              title={t("team.title")}
              lead={t("team.text")}
            />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
