import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { SmoothScroll } from "@/src/components/layout/smooth-scroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ad Vibe | Independent Graphic Design Studio",
  description: "Ad Vibe is an independent graphic design studio creating distinctive brand identities, packaging, campaigns and digital experiences.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Ad Vibe | Independent Graphic Design Studio",
    description: "Distinctive brand identities, packaging, campaigns and digital design for ideas worth noticing.",
    siteName: "Ad Vibe Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Vibe | Independent Graphic Design Studio",
    description: "Distinctive brand identities, packaging, campaigns and digital design for ideas worth noticing.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
