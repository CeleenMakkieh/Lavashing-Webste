import type { Metadata } from "next";
import "../styles/index.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
import BackToTop from "./components/BackToTop";
import LanguagePicker from "./components/LanguagePicker";
import { Toaster } from "./components/ui/sonner";
import { getSiteSettings } from "@/lib/wordpress";
import { FALLBACK_SETTINGS } from "@/lib/fallback-data";
import { TranslationProvider } from "@/contexts/TranslationContext";

export const metadata: Metadata = {
  title: "Lavashing — Dallas Marketing & Web Agency",
  description:
    "A modern marketing and web agency crafting premium digital solutions for ambitious brands. Based in Dallas, TX.",
  icons: {
    icon: "/LM.png",
    shortcut: "/LM.png",
    apple: "/LM.png",
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
      <body>
        <TranslationProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer settings={settings} />
            <AIChat />
            <BackToTop />
            <LanguagePicker />
            <Toaster />
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
