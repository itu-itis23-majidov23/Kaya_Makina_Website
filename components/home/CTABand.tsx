import Image from "next/image";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import HazardDivider from "@/components/ui/HazardDivider";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

// Full-width conversion band, reused at the bottom of most pages.
export default function CTABand() {
  const t = useTranslations("home.cta");

  return (
    <section className="relative bg-ink-950 text-white">
      <HazardDivider />
      <Image
        src="/images/cta-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-ink-200 sm:text-lg">
          {t("text")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" size="lg">
            {t("button")}
          </Button>
          <Button href={`tel:${PHONE_TEL}`} variant="outline" size="lg">
            <Phone className="h-5 w-5" aria-hidden />
            {PHONE_DISPLAY}
          </Button>
        </div>
      </div>
    </section>
  );
}
