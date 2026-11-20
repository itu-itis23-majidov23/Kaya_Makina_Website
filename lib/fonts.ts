import { Geologica, Inter, JetBrains_Mono } from "next/font/google";

// All three faces were checked for Azerbaijani (ə Ə ğ ı İ ş) and Cyrillic
// coverage before being chosen — keep that in mind when swapping a font.
// Chinese falls through to the visitor's system font (see app/globals.css).

const geologica = Geologica({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geologica",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Class names that expose the three font CSS variables on <html>. */
export const fontVariables = `${geologica.variable} ${inter.variable} ${jetbrains.variable}`;
