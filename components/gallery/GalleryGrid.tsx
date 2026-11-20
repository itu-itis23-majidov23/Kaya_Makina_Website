"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryItem = {
  src: string;
  caption: string;
  w: number;
  h: number;
};

// Masonry photo wall (CSS columns, so portrait and landscape shots keep
// their own proportions) with a native <dialog> lightbox — no library.
// Captions are resolved server-side and passed in, so this client
// component ships no translation logic.
export default function GalleryGrid({
  items,
  closeLabel,
  prevLabel,
  nextLabel,
}: {
  items: GalleryItem[];
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const open = (i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
    setActive(null);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((cur) =>
        cur === null ? cur : (cur + dir + items.length) % items.length,
      );
    },
    [items.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  const current = active === null ? null : items[active];
  const navBtn =
    "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-bg/75 text-fg backdrop-blur-sm transition-colors hover:border-brand hover:text-brand-bright";

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <li key={item.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden rounded-lg border border-line bg-surface text-left"
            >
              <Image
                src={item.src}
                alt={item.caption}
                width={item.w}
                height={item.h}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 via-bg/50 to-transparent px-4 pb-3 pt-12 text-[0.8125rem] font-medium leading-snug text-fg">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Backdrop click closes; Escape is handled natively by <dialog>. */}
      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(94vw,1100px)] overflow-visible bg-transparent p-0 text-fg backdrop:bg-bg/90 backdrop:backdrop-blur-sm"
      >
        {current && active !== null && (
          <figure className="relative">
            <div className="relative h-[min(72vh,820px)] w-full">
              <Image
                src={current.src}
                alt={current.caption}
                fill
                sizes="94vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-sm text-fg">
              <span>{current.caption}</span>
              <span className="shrink-0 font-mono text-xs tracking-[0.1em] text-dim">
                {String(active + 1).padStart(2, "0")} / {items.length}
              </span>
            </figcaption>
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="absolute -top-3 right-0 flex h-10 w-10 -translate-y-full items-center justify-center rounded-full bg-brand text-bg transition-colors hover:bg-brand-bright"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={prevLabel}
              className={`${navBtn} left-2 sm:left-3`}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={nextLabel}
              className={`${navBtn} right-2 sm:right-3`}
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
}
