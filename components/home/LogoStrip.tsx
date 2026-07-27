import { useTranslations } from "next-intl";
import { BRANDS } from "@/lib/content";

// Placeholder references strip: machinery brands the workshop services.
// TODO: replace the text tiles with real customer/partner logos when available.
export default function LogoStrip() {
  const t = useTranslations("home.brands");

  return (
    <section className="border-y border-ink-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center font-display text-sm font-semibold uppercase tracking-[0.25em] text-ink-400">
          {t("title")}
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {BRANDS.map((brand) => (
            <li
              key={brand}
              className="font-display text-xl font-bold uppercase tracking-widest text-ink-300 transition-colors hover:text-ink-500 sm:text-2xl"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
