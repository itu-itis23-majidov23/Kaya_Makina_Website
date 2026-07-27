import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CTABand from "@/components/home/CTABand";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { EQUIPMENT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "equipment");
}

export default async function EquipmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("equipment");

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EQUIPMENT.map(({ id, image, brands }, i) => (
              <Reveal key={id} delay={(i % 4) * 90} className="h-full">
                <EquipmentCard id={id} image={image} brands={brands} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl border-l-4 border-brand-500 bg-white px-6 py-4 text-sm leading-relaxed text-ink-500">
              {t("note")}
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
