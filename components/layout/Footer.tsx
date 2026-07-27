import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/content";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import HazardDivider from "@/components/ui/HazardDivider";

const NAV = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "equipment", href: "/equipment" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

export default function Footer() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const tServices = useTranslations("services.items");
  const tContact = useTranslations("contact.info");

  return (
    <footer className="bg-ink-950 text-ink-300">
      <HazardDivider />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="clip-corner block h-11 w-11 shrink-0 overflow-hidden bg-white p-0.5">
              <Image
                src="/logo.jpg"
                alt=""
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-bold uppercase tracking-wide text-white">
                Kaya <span className="text-brand-500">Makina</span>
              </span>
              <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.3em] text-ink-400">
                {tCommon("tagline")}
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{tFooter("blurb")}</p>
        </div>

        {/* Quick links */}
        <nav aria-label={tFooter("quickLinks")}>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {tFooter("quickLinks")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className="transition-colors hover:text-brand-400">
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label={tNav("services")}>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {tNav("services")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map(({ id }) => (
              <li key={id}>
                <Link
                  href={`/services#${id}`}
                  className="transition-colors hover:text-brand-400"
                >
                  {tServices(`${id}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {tNav("contact")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
              {tContact("address")}
            </li>
            <li>
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2.5 transition-colors hover:text-brand-400"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2.5 transition-colors hover:text-brand-400"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                {EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
              {tContact("hours")}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <p className="text-[11px] leading-relaxed text-ink-500">
            {tFooter("disclaimer")}
          </p>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-ink-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Kaya Makina. {tFooter("rights")}
          </p>
          <p className="font-display uppercase tracking-[0.2em]">
            {tFooter("location")}
          </p>
        </div>
      </div>
    </footer>
  );
}
