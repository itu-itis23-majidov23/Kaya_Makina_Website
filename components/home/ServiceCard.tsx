import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/lib/content";

// One cell of the services panel on the home page. The cells share hairline
// borders (see the gap-px grid in the page), so the card itself has none.
// On phones it collapses to a compact row — icon, text, arrow — so eight
// services do not turn into eight screens of scrolling.
export default function ServiceCard({ service }: { service: Service }) {
  const t = useTranslations("services.items");
  const tCommon = useTranslations("common");
  const Icon = service.icon;

  return (
    <Link
      href={`/services#${service.id}`}
      className="group flex h-full items-start gap-4 bg-surface p-5 transition-colors duration-200 hover:bg-raised sm:flex-col sm:items-stretch sm:gap-0 sm:p-6 lg:p-7"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-bg text-brand transition-colors duration-200 group-hover:border-brand/60">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-display text-base font-semibold leading-snug tracking-[-0.01em] text-fg sm:mt-6 sm:text-[1.0625rem]">
          {t(`${service.id}.title`)}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted sm:mt-2">
          {t(`${service.id}.short`)}
        </p>
        <span className="label mt-6 hidden items-center gap-2 transition-colors duration-200 group-hover:text-brand sm:inline-flex">
          {tCommon("learnMore")}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </div>
      <ArrowRight className="mt-3.5 h-4 w-4 shrink-0 text-dim sm:hidden" aria-hidden />
    </Link>
  );
}
