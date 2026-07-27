import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { WHATSAPP_LINK } from "@/lib/site";

// Official WhatsApp green kept for instant recognition.
export default function WhatsAppButton({
  variant = "floating",
}: {
  variant?: "floating" | "inline";
}) {
  const t = useTranslations("common");

  if (variant === "inline") {
    return (
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="clip-corner inline-flex items-center justify-center gap-2 bg-[#25d366] px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#1eb855]"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        {t("whatsapp")}
      </a>
    );
  }

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl shadow-black/25 transition-transform hover:scale-110 motion-reduce:transition-none"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
