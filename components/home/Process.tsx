import Image from "next/image";
import { useTranslations } from "next-intl";
import LoopVideo from "@/components/ui/LoopVideo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS } from "@/lib/content";

// "From diagnosis to test run" — the four stages a major repair goes through,
// each shown with a photo from the workshop. The last tile is a short muted
// clip of an engine running on the stand.
export default function Process() {
  const t = useTranslations("home.process");
  const tCommon = useTranslations("common");

  return (
    <section className="py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            lead={t("lead")}
          />
        </Reveal>

        <ol className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {PROCESS.map(({ id, image, position, video }, i) => (
            <li key={id}>
              <Reveal delay={i * 90}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-line bg-surface sm:aspect-[4/5]">
                  {video ? (
                    <LoopVideo
                      src={video}
                      poster={image}
                      position={position}
                      playLabel={tCommon("playVideo")}
                      pauseLabel={tCommon("pauseVideo")}
                    />
                  ) : (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      style={{ objectPosition: position }}
                    />
                  )}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="font-mono text-xs font-medium tracking-[0.1em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.01em] text-fg">
                  {t(`steps.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`steps.${id}.text`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
