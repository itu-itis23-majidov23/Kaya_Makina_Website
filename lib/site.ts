// Central place for every contact detail and external URL.
// TODO: replace the placeholder phone/WhatsApp/email/map values with the
// real company details before launch — nothing else needs to change.

export const SITE_URL = "https://kayamakina.az";
export const COMPANY = "Kaya Makina";

export const PHONE_DISPLAY = "+994 50 000 00 00"; // TODO real number
export const PHONE_TEL = "+994500000000"; // TODO real number
export const WHATSAPP_NUMBER = "994500000000"; // TODO real number (digits only)
export const EMAIL = "info@kayamakina.az"; // TODO confirm the mailbox exists (the domain's mail is on Google)

// TODO: create a form on https://formspree.io (free tier) and paste the
// endpoint here, e.g. "https://formspree.io/f/abcdwxyz". Until set, the
// contact form shows a call/WhatsApp fallback instead of submitting.
export const FORMSPREE_URL: string | null = null;

// TODO: paste the Google Maps embed URL for the workshop location.
export const MAPS_EMBED_URL: string | null = null;

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const OG_LOCALES: Record<string, string> = {
  az: "az_AZ",
  en: "en_US",
  ru: "ru_RU",
  zh: "zh_CN",
};

// <html lang> value per locale. Chinese is Simplified, and saying so lets
// browsers pick Simplified glyph shapes from the system fonts.
export const HTML_LANG: Record<string, string> = {
  az: "az",
  en: "en",
  ru: "ru",
  zh: "zh-Hans",
};

// What the language switcher shows for each locale.
export const LOCALE_LABELS: Record<string, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
  zh: "中文",
};
