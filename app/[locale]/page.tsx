import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CTABand from "@/components/home/CTABand";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import ServiceCard from "@/components/home/ServiceCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { MACHINES, SERVICES } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "home");
}

const arrow =
  "h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 motion-reduce:transition-none";

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const partsBullets = t.raw("parts.bullets") as string[];

  return (
    <>
      <Hero />

      {/* About */}
      <section className="py-20 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-20">
          <Reveal>
            <SectionHeading kicker={t("about.kicker")} title={t("about.title")} />
            <p className="mt-6 leading-relaxed text-muted">{t("about.p1")}</p>
            <p className="mt-4 leading-relaxed text-muted">{t("about.p2")}</p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                {t("about.cta")}
                <ArrowRight className={arrow} aria-hidden />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative sm:pb-14 sm:pr-14">
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-line">
                <Image
                  src="/images/workshop-floor.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 hidden aspect-[4/5] w-[36%] overflow-hidden rounded-lg border border-line-strong shadow-2xl shadow-black/70 sm:block">
                <Image
                  src="/images/engine-front.jpg"
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                kicker={t("services.kicker")}
                title={t("services.title")}
                lead={t("services.lead")}
              />
              <Button href="/services" variant="outline">
                {t("services.cta")}
                <ArrowRight className={arrow} aria-hidden />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <ServiceCard service={service} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Process />

      {/* Machines */}
      <section className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-line">
              <Image
                src="/images/yard.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              kicker={t("machines.kicker")}
              title={t("machines.title")}
              lead={t("machines.lead")}
            />
            <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line min-[26rem]:grid-cols-2">
              {MACHINES.map(({ id, icon: Icon }) => (
                <li
                  key={id}
                  className="flex items-center gap-3.5 bg-bg px-5 py-4 text-[0.9375rem] font-medium text-fg"
                >
                  <Icon className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
                  {t(`machines.items.${id}`)}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="label">{t("machines.brandsLabel")}</span>
              <span className="text-[0.9375rem] text-fg">{t("machines.brands")}</span>
            </p>
            <Link
              href="/equipment"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-bright"
            >
              {t("machines.cta")}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Spare parts */}
      <section className="py-20 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              kicker={t("parts.kicker")}
              title={t("parts.title")}
              lead={t("parts.text")}
            />
            <ul className="mt-8 space-y-3">
              {partsBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-[0.9375rem] text-fg">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/contact">
                {t("parts.cta")}
                <ArrowRight className={arrow} aria-hidden />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-lg border border-line">
                <Image
                  src="/images/workshop-hall.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover object-[62%_50%]"
                />
              </div>
              <div className="col-span-2 grid gap-4">
                <div className="relative overflow-hidden rounded-lg border border-line">
                  <Image
                    src="/images/component-4.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg border border-line">
                  <Image
                    src="/images/pistons-rods.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover object-[22%_70%]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
