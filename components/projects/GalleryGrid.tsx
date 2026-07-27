"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryItem = { src: string; caption: string };

// Responsive photo grid with a native <dialog> lightbox — no library.
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

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => open(i)}
              className="clip-corner group relative block aspect-[4/3] w-full overflow-hidden bg-ink-100"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent px-3 pb-2.5 pt-8 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none">
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
        className="m-auto w-[min(92vw,1100px)] bg-transparent p-0 backdrop:bg-ink-950/90"
      >
        {active !== null && (
          <figure className="relative">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={items[active].src}
                alt={items[active].caption}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-ink-200">
              {items[active].caption}
            </figcaption>
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="absolute -top-2 right-0 flex h-10 w-10 -translate-y-full items-center justify-center bg-brand-500 text-ink-950 transition-colors hover:bg-brand-600"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={prevLabel}
              className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ink-950/70 text-white transition-colors hover:bg-brand-500 hover:text-ink-950"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={nextLabel}
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ink-950/70 text-white transition-colors hover:bg-brand-500 hover:text-ink-950"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
}
