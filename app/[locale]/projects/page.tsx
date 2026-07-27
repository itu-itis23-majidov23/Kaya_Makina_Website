import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CTABand from "@/components/home/CTABand";
import GalleryGrid from "@/components/projects/GalleryGrid";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { GALLERY } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "projects");
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const tCommon = await getTranslations("common");

  const items = GALLERY.map(({ id, image }) => ({
    src: image,
    caption: t(`captions.${id}`),
  }));

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <GalleryGrid
              items={items}
              closeLabel={tCommon("close")}
              prevLabel={tCommon("previous")}
              nextLabel={tCommon("next")}
            />
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink-400">
              {t("note")}
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
