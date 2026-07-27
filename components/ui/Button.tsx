import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "dark" | "outline" | "outline-dark";
type Size = "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-500 text-ink-950 hover:bg-brand-600",
  dark: "bg-ink-950 text-white hover:bg-ink-700",
  // for dark backgrounds
  outline:
    "border-2 border-white/70 text-white hover:border-brand-500 hover:text-brand-400",
  // for light backgrounds
  "outline-dark":
    "border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white",
};

const SIZES: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
}: Props) {
  const cls = `clip-corner inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-wider transition-colors ${VARIANTS[variant]} ${SIZES[size]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`;

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
