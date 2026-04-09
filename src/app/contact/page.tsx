import { getSiteSettings } from "@/lib/wordpress";
import { FALLBACK_SETTINGS } from "@/lib/fallback-data";
import Contact from "../pages/Contact";

export default async function ContactPage() {
  const settings = (await getSiteSettings()) ?? FALLBACK_SETTINGS;
  return (
    <Contact
      email={settings.contactEmail}
      phone={settings.contactPhone}
      address={settings.contactAddress}
    />
  );
}
