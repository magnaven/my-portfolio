import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { NavBar } from "@/components/NavBar";
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
  description: "Lead Product Designer with a founder's lens. 12 years building products at Magna Ventures, AIDA AI, and beyond.",
  openGraph: {
    title: "Ida Dilfer Tinker — Product Designer",
    description: "Lead Product Designer with a founder's lens. 12 years building products at Magna Ventures, AIDA AI, and beyond.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="bg-canvas text-ink font-sans antialiased">
        <SmoothScrollProvider>
          <NavBar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
