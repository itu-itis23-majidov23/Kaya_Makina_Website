import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/lib/content";

export default function ServiceCard({ service }: { service: Service }) {
  const t = useTranslations("services.items");
  const tCommon = useTranslations("common");
  const Icon = service.icon;

  return (
    <Link
      href={`/services#${service.id}`}
      className="clip-corner-lg group flex h-full flex-col bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={service.image}
          alt={t(`${service.id}.title`)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span className="absolute bottom-0 left-5 flex h-12 w-12 translate-y-1/2 items-center justify-center bg-brand-500 text-ink-950">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-9">
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink-900">
          {t(`${service.id}.title`)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
          {t(`${service.id}.short`)}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 transition-colors group-hover:text-ink-900">
          {tCommon("learnMore")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
