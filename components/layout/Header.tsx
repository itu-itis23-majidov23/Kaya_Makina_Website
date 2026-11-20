"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { PHONES } from "@/lib/site";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";

const NAV = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "equipment", href: "/equipment" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  // Close the mobile menu on Escape and stop the page scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[4.5rem] xl:gap-6">
        <Link
          href="/"
          aria-label="Kaya Makina"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Logo tagline={tCommon("tagline")} />
        </Link>

        <nav className="hidden h-full items-stretch lg:flex" aria-label="Main">
          {NAV.map(({ key, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center whitespace-nowrap px-2.5 text-sm font-medium transition-colors xl:px-4 ${
                  active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {t(key)}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-2.5 -bottom-px h-0.5 bg-brand xl:inset-x-4"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="inline-flex h-10 items-center whitespace-nowrap rounded-md bg-brand px-3.5 text-sm font-semibold text-bg transition-colors hover:bg-brand-bright xl:px-4"
          >
            {t("requestService")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={t(open ? "closeMenu" : "openMenu")}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-fg lg:hidden"
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden"
        >
          <nav className="shell flex min-h-full flex-col py-6" aria-label="Mobile">
            <ul>
              {[{ key: "home", href: "/" } as const, ...NAV].map(({ key, href }) => {
                const active = href === "/" ? pathname === "/" : isActive(href);
                return (
                  <li key={key} className="border-b border-line">
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 font-display text-xl font-semibold tracking-[-0.01em] ${
                        active ? "text-brand" : "text-fg"
                      }`}
                    >
                      {t(key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex items-start justify-between gap-4">
              <div className="flex items-start gap-2.5 text-sm font-medium text-fg">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span className="flex flex-col gap-2">
                  {PHONES.map(({ display, tel }) => (
                    <a key={tel} href={`tel:${tel}`}>
                      {display}
                    </a>
                  ))}
                </span>
              </div>
              <LocaleSwitcher />
            </div>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 flex h-12 items-center justify-center rounded-md bg-brand text-[0.9375rem] font-semibold text-bg"
            >
              {t("requestService")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
