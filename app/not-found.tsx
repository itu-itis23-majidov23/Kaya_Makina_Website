import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

// The one 404 page of the static export (out/404.html). It is served for any
// unknown URL, so it cannot know the visitor's language — it answers in all
// four and links to each home page. It carries its own <html> because the
// root layout is a pass-through.
export const metadata: Metadata = {
  title: "404 — Kaya Makina",
  robots: { index: false },
};

const LANGUAGES = [
  { href: "/az/", lang: "az", message: "Səhifə tapılmadı", home: "Ana səhifə" },
  { href: "/en/", lang: "en", message: "Page not found", home: "Home" },
  { href: "/ru/", lang: "ru", message: "Страница не найдена", home: "Главная" },
  { href: "/zh/", lang: "zh-Hans", message: "未找到该页面", home: "首页" },
] as const;

export default function NotFound() {
  return (
    <html lang="az" className={fontVariables}>
      <body className="bg-bg font-sans text-fg antialiased">
        <main className="shell flex min-h-svh flex-col py-8">
          <Link href="/az/" aria-label="Kaya Makina" className="self-start">
            <Logo />
          </Link>

          <div className="flex flex-1 flex-col justify-center py-16">
            <p className="kicker">404</p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,1.4rem+3.6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              {LANGUAGES[0].message}
            </h1>

            <ul className="mt-10 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {LANGUAGES.map(({ href, lang, message, home }) => (
                <li key={href} lang={lang}>
                  <Link
                    href={href}
                    className="group flex h-full items-center justify-between gap-4 bg-surface px-6 py-5 transition-colors hover:bg-raised"
                  >
                    <span>
                      <span className="block text-sm text-muted">{message}</span>
                      <span className="mt-1 block font-medium text-fg">{home}</span>
                    </span>
                    <span
                      aria-hidden
                      className="text-brand transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
