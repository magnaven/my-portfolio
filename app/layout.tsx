import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const sansFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ida Dilfer Tinker — Product Designer",
  description: "Portfolio of Ida Dilfer Tinker, Lead Product Designer at Magna Ventures and AIDA AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="bg-canvas text-ink font-sans antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
