import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { EMAIL, MAPS_EMBED_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
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

  const INFO = [
    { icon: MapPin, label: t("info.addressLabel"), value: t("info.address"), href: null },
    { icon: Phone, label: t("info.phoneLabel"), value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
    { icon: Mail, label: t("info.emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Clock, label: t("info.hoursLabel"), value: t("info.hours"), href: null },
  ] as const;

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          {/* Contact info */}
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink-900">
              {t("info.title")}
            </h2>
            <ul className="mt-8 space-y-5">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink-900 text-brand-500">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-0.5 block font-medium text-ink-900 transition-colors hover:text-brand-600"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-medium text-ink-900">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <WhatsAppButton variant="inline" />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120} className="lg:col-span-3">
            <div className="clip-corner-lg bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink-900">
                {t("form.title")}
              </h2>
              <p className="mt-2 text-sm text-ink-500">{t("form.lead")}</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white pb-0">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            {MAPS_EMBED_URL ? (
              <iframe
                src={MAPS_EMBED_URL}
                title={t("map.title")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-96 w-full border-0"
              />
            ) : (
              // TODO: set MAPS_EMBED_URL in lib/site.ts to replace this placeholder.
              <div className="flex h-96 w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-ink-200 bg-paper text-center">
                <MapPin className="h-10 w-10 text-brand-500" aria-hidden />
                <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink-700">
                  {t("map.title")}
                </p>
                <p className="max-w-sm text-sm text-ink-400">{t("map.placeholder")}</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
