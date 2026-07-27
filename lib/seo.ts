import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { OG_LOCALES, SITE_URL } from "./site";

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "equipment"
  | "projects"
  | "contact";

// Trailing slashes must match `trailingSlash: true` in next.config.ts —
// sitemap, canonical and hreflang URLs all agree byte-for-byte.
export const PAGE_PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about/",
  services: "/services/",
  equipment: "/equipment/",
  projects: "/projects/",
  contact: "/contact/",
};

export function localizedUrl(locale: string, page: PageKey): string {
  return `${SITE_URL}/${locale}${PAGE_PATHS[page]}`;
}

export async function pageMetadata(
  locale: string,
  page: PageKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);

  return {
    title,
    description,
    alternates: {
      canonical: localizedUrl(locale, page),
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, localizedUrl(l, page)]),
        ),
        "x-default": localizedUrl(routing.defaultLocale, page),
      },
    },
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, page),
      siteName: "Kaya Makina",
      locale: OG_LOCALES[locale],
      type: "website",
      images: [
        { url: `${SITE_URL}/og/og-cover.jpg`, width: 1200, height: 630 },
      ],
    },
  };
}
