"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

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
    <div className={`flex items-center gap-1 ${className}`}>
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          aria-current={l === locale ? "true" : undefined}
          className={`px-2 py-1 font-display text-xs font-semibold uppercase tracking-widest transition-colors ${
            l === locale
              ? "bg-brand-500 text-ink-950"
              : "text-ink-300 hover:text-white"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
