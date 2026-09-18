import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.churchName} | ${siteConfig.orgName}`,
  description: `${siteConfig.tagline} — ${siteConfig.address.full}`,
  openGraph: {
    title: `${siteConfig.churchName} | ${siteConfig.orgName}`,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.churchName,
    images: ["/images/logo-full.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body antialiased">
        <SmoothScroll />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
