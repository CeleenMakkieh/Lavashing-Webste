import type { Metadata } from "next";
import Script from "next/script";
import "../styles/index.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import LanguagePicker from "./components/LanguagePicker";
import { Toaster } from "./components/ui/sonner";
import { getSiteSettings } from "@/lib/wordpress";
import { FALLBACK_SETTINGS } from "@/lib/fallback-data";
import { TranslationProvider } from "@/contexts/TranslationContext";

export const metadata: Metadata = {
  title: "Lavashing Dallas Marketing Agency",
  description:
    "A modern marketing agency crafting premium digital solutions for ambitious brands. Based in Dallas, TX.",
  icons: {
    icon: "/LM.png",
    shortcut: "/LM.png",
    apple: "/LM.png",
  },
  openGraph: {
    title: "Lavashing Dallas Marketing Agency",
    description: "A modern marketing agency crafting premium digital solutions for ambitious brands. Based in Dallas, TX.",
    url: "https://lavashing.com",
    siteName: "Lavashing",
    images: [{ url: "/LM.png", width: 512, height: 512, alt: "Lavashing" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lavashing Dallas Marketing Agency",
    description: "A modern marketing agency crafting premium digital solutions for ambitious brands. Based in Dallas, TX.",
    images: ["/LM.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = (await getSiteSettings()) ?? FALLBACK_SETTINGS;
  return (
    <html lang="en">
      <head>
        {/* Leo – Tidio chat widget */}
        <script src="//code.tidio.co/atfsjecu0re0i3grhpmfmkiezzvwg9fu.js" async />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-H90TEQNK3S" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H90TEQNK3S');
        `}</Script>
        <TranslationProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer settings={settings} />
            <BackToTop />
            <LanguagePicker />
            <Toaster />
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
