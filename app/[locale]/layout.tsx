import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import JsonLd from "@/components/ui/JsonLd";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { HTML_LANG, SITE_URL } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
  colorScheme: "dark",
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: "%s | Kaya Makina",
      default: `Kaya Makina — ${t("home.title")}`,
    },
    description: t("home.description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={HTML_LANG[locale] ?? locale}
      className={fontVariables}
    >
      <body className="bg-bg font-sans text-fg antialiased">
        <a href="#main" className="skip-link">
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton variant="floating" />
        </NextIntlClientProvider>
        <JsonLd data={localBusinessJsonLd(locale)} />
      </body>
    </html>
  );
}
