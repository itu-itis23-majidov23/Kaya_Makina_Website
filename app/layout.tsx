import type { ReactNode } from "react";

// Pass-through root layout: the real <html>/<body> live in app/[locale]/layout.tsx.
// This is the documented next-intl pattern for static export without middleware.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
