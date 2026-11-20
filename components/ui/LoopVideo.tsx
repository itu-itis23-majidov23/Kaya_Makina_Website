"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// Short muted loop used as a "living photo". It only downloads and plays
// once it scrolls into view, pauses when it leaves, never autoplays for
// visitors who prefer reduced motion, and always offers a pause control.
export default function LoopVideo({
  src,
  poster,
  position = "50% 50%",
  playLabel,
  pauseLabel,
}: {
  src: string;
  poster: string;
  position?: string;
  playLabel: string;
  pauseLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-bg/70 text-fg backdrop-blur-sm transition-colors hover:border-brand hover:text-brand-bright"
      >
        {playing ? (
          <Pause className="h-4 w-4" aria-hidden />
        ) : (
          <Play className="h-4 w-4 translate-x-px" aria-hidden />
        )}
      </button>
    </>
  );
}
