"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Reveal-on-scroll wrapper. Content is rendered VISIBLE on the server so
// no-JS visitors, search engines and pre-hydration paints always see it.
// After hydration, elements still below the viewport are hidden and then
// revealed with a fade/slide the first time they scroll into view.
// prefers-reduced-motion users never get the animation.
type State = "visible" | "hidden" | "revealed";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Elements already in (or near) the viewport stay visible — hiding them
    // after first paint would flash. Only below-fold content animates.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: state === "revealed" ? `${delay}ms` : undefined }}
      className={`${
        state === "hidden"
          ? "translate-y-6 opacity-0"
          : "translate-y-0 opacity-100"
      } ${state !== "visible" ? "transition-all duration-700 ease-out" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
