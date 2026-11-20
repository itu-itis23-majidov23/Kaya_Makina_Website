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
    { icon: Phone, label: t("info.phoneLabel"), value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
    { icon: Mail, label: t("info.emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: t("info.addressLabel"), value: t("info.address"), href: null },
    { icon: Clock, label: t("info.hoursLabel"), value: t("info.hours"), href: null },
  ] as const;

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
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <li
                  key={label}
                  className="flex items-center gap-4 border-b border-line bg-surface px-5 py-4 last:border-b-0"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-bg text-brand">
                    <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="label">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block break-words text-[0.9375rem] font-medium text-fg transition-colors hover:text-brand-bright"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[0.9375rem] font-medium text-fg">{value}</p>
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
            {MAPS_EMBED_URL ? (
              <iframe
                src={MAPS_EMBED_URL}
                title={t("map.title")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-96 w-full rounded-xl border border-line"
              />
            ) : (
              // TODO: set MAPS_EMBED_URL in lib/site.ts to replace this placeholder.
              <div className="flex h-72 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-strong bg-bg px-6 text-center">
                <MapPin className="h-8 w-8 text-brand" strokeWidth={1.75} aria-hidden />
                <p className="font-display text-lg font-semibold tracking-[-0.01em] text-fg">
                  {t("map.title")}
                </p>
                <p className="max-w-sm text-sm text-muted">{t("map.placeholder")}</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
