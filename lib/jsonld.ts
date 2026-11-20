import { EMAIL, PHONE_TEL, PHONES, SITE_URL } from "./site";

// LocalBusiness structured data, rendered once per page in the locale layout.
export function localBusinessJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRepair"],
    "@id": `${SITE_URL}/#business`,
    name: "Kaya Makina",
    url: `${SITE_URL}/${locale}/`,
    logo: `${SITE_URL}/logo.jpg`,
    image: `${SITE_URL}/og/og-cover.jpg`,
    telephone: PHONE_TEL,
    contactPoint: PHONES.map(({ tel }) => ({
      "@type": "ContactPoint",
      telephone: tel,
      contactType: "customer service",
    })),
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baku",
      addressCountry: "AZ",
    },
    areaServed: "Azerbaijan",
    openingHours: "Mo-Sa 09:00-18:00",
    description:
      "Maintenance, repair and technical servicing of heavy machinery and construction equipment — engine and transmission overhaul, hydraulics, diagnostics and spare parts supply.",
    sameAs: [],
  };
}
