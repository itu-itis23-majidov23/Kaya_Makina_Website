import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CTABand from "@/components/home/CTABand";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY, TEST_RUN_VIDEO } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "gallery");
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  const tCommon = await getTranslations("common");

  const items = GALLERY.map(({ id, w, h }) => ({
    src: `/images/${id}.jpg`,
    caption: t(`captions.${id}`),
    w,
    h,
  }));

  return (
    <>
      <PageHeader
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        lead={t("intro.lead")}
        image="/images/overhead-crane.jpg"
        position="50% 40%"
      />

      {/* Test-run video */}
      <section className="border-b border-line py-20 lg:py-24">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-line bg-black">
              <video
                controls
                playsInline
                preload="none"
                poster={TEST_RUN_VIDEO.poster}
                aria-label={t("video.title")}
                className="aspect-video w-full"
              >
                <source src={TEST_RUN_VIDEO.src} type="video/mp4" />
              </video>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              kicker={t("video.kicker")}
              title={t("video.title")}
              lead={t("video.text")}
            />
          </Reveal>
        </div>
      </section>

      {/* Photos */}
      <section className="py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading kicker={t("photos.kicker")} title={t("photos.title")} />
          </Reveal>
          <div className="mt-12">
            <GalleryGrid
              items={items}
              closeLabel={tCommon("close")}
              prevLabel={tCommon("previous")}
              nextLabel={tCommon("next")}
            />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
