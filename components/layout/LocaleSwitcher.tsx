"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { HTML_LANG, LOCALE_LABELS } from "@/lib/site";

// Switches locale while preserving the current page: usePathname from
// i18n/navigation returns the locale-less path, and Link re-prefixes it.
export default function LocaleSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center rounded-md border border-line p-0.5 ${className}`}
    >
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          lang={HTML_LANG[l]}
          hrefLang={HTML_LANG[l]}
          aria-current={l === locale ? "true" : undefined}
          className={`whitespace-nowrap rounded-[0.25rem] px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase leading-4 tracking-[0.1em] transition-colors ${
            l === locale ? "bg-raised text-fg" : "text-dim hover:text-fg"
          }`}
        >
          {LOCALE_LABELS[l] ?? l}
        </Link>
      ))}
    </div>
  );
}
