import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/content";
import { EMAIL, MAPS_LINK, PHONES } from "@/lib/site";
import Logo from "./Logo";

const NAV = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "equipment", href: "/equipment" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;

export default function Footer() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const tServices = useTranslations("services.items");
  const tContact = useTranslations("contact.info");

  const link = "transition-colors hover:text-brand-bright";

  return (
    <footer className="border-t border-line bg-bg text-sm text-muted">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.3fr_1.1fr] lg:gap-10">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="Kaya Makina" className="inline-block">
            <Logo tagline={tCommon("tagline")} size="sm" />
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed">{tFooter("blurb")}</p>
        </div>

        {/* Quick links */}
        <nav aria-label={tFooter("quickLinks")}>
          <h2 className="label">{tFooter("quickLinks")}</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className={link}>
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label={tNav("services")}>
          <h2 className="label">{tNav("services")}</h2>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map(({ id }) => (
              <li key={id}>
                <Link href={`/services#${id}`} className={link}>
                  {tServices(`${id}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="label">{tNav("contact")}</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className={link}>
                {tContact("address")}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span className="flex flex-col gap-1.5">
                {PHONES.map(({ display, tel }) => (
                  <a key={tel} href={`tel:${tel}`} className={link}>
                    {display}
                  </a>
                ))}
              </span>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={`flex items-center gap-2.5 ${link}`}>
                <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                {EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              {tContact("hours")}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell py-6">
          <p className="max-w-4xl text-xs leading-relaxed text-dim">
            {tFooter("disclaimer")}
          </p>
          <div className="mt-5 flex flex-col justify-between gap-2 text-xs text-dim sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Kaya Makina. {tFooter("rights")}
            </p>
            <p className="font-mono uppercase tracking-[0.14em]">
              {tFooter("location")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
