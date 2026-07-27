import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import JsonLd from "@/components/ui/JsonLd";
import { routing } from "@/i18n/routing";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-oswald",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

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

  return (
    <html lang={locale} className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-paper font-sans text-ink-900 antialiased">
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton variant="floating" />
        </NextIntlClientProvider>
        <JsonLd data={localBusinessJsonLd(locale)} />
      </body>
    </html>
  );
}
