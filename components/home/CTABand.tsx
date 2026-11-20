import Image from "next/image";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from "@/lib/site";

// Closing conversion band, reused at the bottom of most pages.
export default function CTABand() {
  const t = useTranslations("home.cta");
  const tCommon = useTranslations("common");

  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-surface">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/overhead-crane.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(70%_130%_at_0%_50%,rgb(231_165_30/0.16),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-l from-surface via-surface/40 to-transparent" />
      </div>

      <div className="shell flex flex-col gap-10 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.875rem,1.3rem+2.4vw,3rem)] font-bold leading-[1.06] tracking-[-0.025em]">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {t("text")}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch xl:flex-row">
          <Button href="/contact" size="lg">
            {t("button")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </Button>
          <Button href={`tel:${PHONE_TEL}`} variant="outline" size="lg">
            <Phone className="h-4 w-4 text-brand" aria-hidden />
            {PHONE_DISPLAY}
          </Button>
          <Button href={WHATSAPP_LINK} variant="outline" size="lg">
            <MessageCircle className="h-4 w-4 text-[#25d366]" aria-hidden />
            WhatsApp
            <span className="sr-only"> — {tCommon("whatsapp")}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
