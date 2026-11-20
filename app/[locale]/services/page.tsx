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
        image="/images/engine-flywheel.jpg"
        position="50% 34%"
      />

      {/* Jump list */}
      <nav aria-label={t("indexLabel")} className="border-b border-line">
        <div className="shell py-6">
          <p className="label">{t("indexLabel")}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SERVICES.map(({ id, icon: Icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3.5 py-2 text-sm text-muted transition-colors hover:border-brand/60 hover:text-fg"
                >
                  <Icon className="h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden />
                  {t(`items.${id}.title`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="shell">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          const bullets = t.raw(`items.${service.id}.bullets`) as string[];
          const flip = i % 2 === 1;
          return (
            <section
              key={service.id}
              id={service.id}
              className="grid items-center gap-10 border-b border-line py-16 last:border-b-0 lg:grid-cols-2 lg:gap-20 lg:py-24"
            >
              <Reveal className={flip ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: service.position }}
                  />
                </div>
              </Reveal>

              <Reveal delay={100} className={flip ? "lg:order-1" : ""}>
                <span className="flex h-12 w-12 items-center justify-center rounded-md border border-line bg-surface text-brand">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)] font-bold leading-[1.12] tracking-[-0.02em]">
                  {t(`items.${service.id}.title`)}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {t(`items.${service.id}.description`)}
                </p>
                <ul className="mt-7 space-y-3 border-t border-line pt-7">
                  {bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-[0.9375rem] leading-snug text-fg"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          );
        })}
      </div>

      <CTABand />
    </>
  );
}
