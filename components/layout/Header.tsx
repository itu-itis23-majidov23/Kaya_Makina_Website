"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "equipment", href: "/equipment" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-ink-950 text-white shadow-lg shadow-black/20">
      {/* Utility bar */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 text-xs text-ink-300">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-1.5 transition-colors hover:text-brand-400"
            >
              <Phone className="h-3.5 w-3.5 text-brand-500" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-1.5 transition-colors hover:text-brand-400"
            >
              <Mail className="h-3.5 w-3.5 text-brand-500" aria-hidden />
              {EMAIL}
            </a>
          </div>
          <LocaleSwitcher />
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="block h-11 w-11 shrink-0 overflow-hidden bg-white p-0.5 clip-corner">
            <Image
              src="/logo.jpg"
              alt=""
              width={44}
              height={44}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold uppercase tracking-wide">
              Kaya <span className="text-brand-500">Makina</span>
            </span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-400">
              {tCommon("tagline")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`px-3 py-2 font-display text-sm font-medium uppercase tracking-wider transition-colors ${
                isActive(href)
                  ? "text-brand-400"
                  : "text-ink-200 hover:text-white"
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="clip-corner inline-flex items-center bg-brand-500 px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-ink-950 transition-colors hover:bg-brand-600"
          >
            {t("requestService")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={t(open ? "closeMenu" : "openMenu")}
          className="p-2 text-white lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6" aria-label="Mobile">
            <ul className="flex flex-col">
              {NAV.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-white/5 px-2 py-3 font-display text-base font-medium uppercase tracking-wider ${
                      isActive(href) ? "text-brand-400" : "text-ink-200"
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-4 px-2">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2 text-sm text-ink-300"
              >
                <Phone className="h-4 w-4 text-brand-500" aria-hidden />
                {PHONE_DISPLAY}
              </a>
              <LocaleSwitcher />
            </div>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="clip-corner mt-4 flex items-center justify-center bg-brand-500 px-5 py-3 font-display text-sm font-semibold uppercase tracking-wider text-ink-950"
            >
              {t("requestService")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
