import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import {
  EMAIL,
  MAPS_DIRECTIONS_URL,
  MAPS_LINK,
  PHONES,
  PLUS_CODE,
  mapsEmbedUrl,
} from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const INFO: {
    icon: typeof Phone;
    label: string;
    lines: { text: string; href?: string }[];
  }[] = [
    {
      icon: Phone,
      label: t("info.phoneLabel"),
      lines: PHONES.map(({ display, tel }) => ({ text: display, href: `tel:${tel}` })),
    },
    { icon: Mail, label: t("info.emailLabel"), lines: [{ text: EMAIL, href: `mailto:${EMAIL}` }] },
    {
      icon: MapPin,
      label: t("info.addressLabel"),
      lines: [{ text: t("info.address"), href: MAPS_LINK }],
    },
    { icon: Clock, label: t("info.hoursLabel"), lines: [{ text: t("info.hours") }] },
  ];

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
        image="/images/workshop-floor.jpg"
        position="50% 40%"
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          {/* Contact details */}
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">
              {t("info.title")}
            </h2>
            <ul className="mt-8 overflow-hidden rounded-xl border border-line">
              {INFO.map(({ icon: Icon, label, lines }) => (
                <li
                  key={label}
                  className="flex items-center gap-4 border-b border-line bg-surface px-5 py-4 last:border-b-0"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-bg text-brand">
                    <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="label">{label}</p>
                    {lines.map(({ text, href }) =>
                      href ? (
                        <a
                          key={text}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-1 block break-words text-[0.9375rem] font-medium text-fg transition-colors hover:text-brand-bright"
                        >
                          {text}
                        </a>
                      ) : (
                        <p key={text} className="mt-1 text-[0.9375rem] font-medium text-fg">
                          {text}
                        </p>
                      ),
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <WhatsAppButton variant="inline" />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-xl border border-line bg-surface p-6 sm:p-8 lg:p-10">
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">
                {t("form.title")}
              </h2>
              <p className="mt-2 text-sm text-muted">{t("form.lead")}</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-line bg-surface py-16 lg:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">
                  {t("map.title")}
                </h2>
                <p className="mt-3 text-muted">{t("info.address")}</p>
                {/* There is no street address; the Plus Code finds the gate. */}
                <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="label">Plus Code</span>
                  <span className="font-mono text-sm text-fg">{PLUS_CODE}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={MAPS_DIRECTIONS_URL}>
                  <Navigation className="h-4 w-4" aria-hidden />
                  {t("map.directions")}
                </Button>
                <Button href={MAPS_LINK} variant="outline">
                  {t("map.open")}
                  <ArrowUpRight className="h-4 w-4 text-brand" aria-hidden />
                </Button>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-line bg-bg">
              <iframe
                src={mapsEmbedUrl(locale)}
                title={t("map.iframeTitle")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[22rem] w-full border-0 sm:h-[26rem]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
