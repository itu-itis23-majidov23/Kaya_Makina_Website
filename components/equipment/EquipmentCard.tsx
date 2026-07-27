import Image from "next/image";
import { useTranslations } from "next-intl";

export default function EquipmentCard({
  id,
  image,
  brands,
}: {
  id: string;
  image: string;
  brands: string;
}) {
  const t = useTranslations("equipment.categories");
  const services = t.raw(`${id}.services`) as string[];

  return (
    <article className="clip-corner-lg flex h-full flex-col bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={t(`${id}.name`)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink-900">
          {t(`${id}.name`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          {t(`${id}.description`)}
        </p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-ink-400">
          {brands}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((s) => (
            <li
              key={s}
              className="bg-paper px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink-700"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
