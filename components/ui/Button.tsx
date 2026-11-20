import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "outline";
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
  primary: "bg-brand text-bg hover:bg-brand-bright",
  outline:
    "border border-line-strong bg-bg/40 text-fg hover:border-brand hover:text-brand-bright",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
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
  const cls = `group/btn inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 ${VARIANTS[variant]} ${SIZES[size]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`;

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
