import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl, PAGE_PATHS, type PageKey } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.keys(PAGE_PATHS) as PageKey[];

  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, page),
      lastModified: new Date(),
      changeFrequency: page === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "home" ? 1 : page === "services" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, localizedUrl(l, page)]),
        ),
      },
    })),
  );
}
